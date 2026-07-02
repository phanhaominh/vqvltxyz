// rival.js - EXPERT AI with REAL ACCELERATION
console.log('rival.js loaded!');

var RivalSystem = {
  settings: {
    active: true,
    skillLevel: 1.05,
    consistency: 0.95,
    aggression: 0.95,
    mistakeRate: 0.002,
    awareness: 1.0,
  },
  
  state: {
    position: 0,
    speed: 0,
    playerX: 0,
    currentLap: 0,
    mistakes: 0,
    distanceToPlayer: 0,
    status: 'racing',
    car: 'RENNTEAM',
    targetSpeed: 0,
    confidence: 1.0,
    lastMistakeTime: 0,
    overtakingMomentum: 0,
    lastOvertakeAttempt: 0,
    boostActive: false,
    boostTimer: 0,
    draftBonus: 0,
    
    // NEW: Acceleration physics
    accel: 0,           // Will be set in init
    decel: 0,           // Will be set in init
    breaking: 0,        // Will be set in init
    keyFaster: true,    // Rival is always accelerating
    keySlower: false,
    nitro: 0,
    nitroAvailable: false,
  },
  
  stats: {
    bestLap: Infinity,
    totalOvertakes: 0,
    totalMistakes: 0,
    averageSpeed: 0,
    speedSamples: []
  },
  
  name: 'Apex Predator',
  trackKnowledge: {},
  
  init: function() {
    var startGap = 1000 + Math.random() * 700;
    this.state.position = racr.params.position + racr.params.playerZ + startGap;
    
    var maxSpeed = racr.params.maxSpeed;
    this.state.accel = maxSpeed / 4;
    this.state.decel = -maxSpeed / 5;
    this.state.breaking = -maxSpeed * 4;
    
    this.state.speed = maxSpeed * 0.3;
    this.state.playerX = 0;
    
    // Team data - car key and full name together
    var teams = [
      { car: 'RENNTEAM', name: 'Rennteam' },
      { car: 'TUM', name: 'TUfast' },
      { car: 'DELFT', name: 'Team Delft' },
      { car: 'TUE', name: 'URE' }
    ];
    
    // Pick ONE team - ensures car image and name match
    var pickedTeam = teams[Math.floor(Math.random() * teams.length)];
    
    this.state.car = pickedTeam.car;
    this.name = pickedTeam.name;
    
    this.buildTrackKnowledge();
    
    this.traits = {
      lateBraker: true,
      smoothDriver: true,
      cornerSpecialist: true,
      straightLineSpeed: 1.0,
      preferredLine: 'inside',
      consistencyFactor: 1.0,
      aggressionLevel: 1.0,
      recoverySpeed: 1.0,
      perfectCorners: true,
    };
    
    console.log('👑 RIVAL INITIALIZED!', this.name, '| Car:', this.state.car);
  },

  reset: function() {
    // Reset rival for new lap/race
    this.state.speed = 0;
    this.state.playerX = 0;
    this.state.position = racr.params.position + racr.params.playerZ + 1000;
    this.state.distanceToPlayer = 0;
    this.state.steerLeft = false;
    this.state.steerRight = false;
    this.state.steerAmount = 0;
    this.state.boostActive = false;
    this.state.boostTimer = 0;
    this.state.status = 'racing';
    
    // Kill any active tween
    if (this.state._laneTween) {
      this.state._laneTween.kill();
      this.state._laneTween = null;
    }

    if (typeof RivalRender !== 'undefined') {
      RivalRender.hudAlpha = 0;
      RivalRender.hudFadeStart = 0;
    }

    
    console.log('🔄 Rival reset - Speed: 0, Position:', Math.floor(this.state.position));
  },
  
  buildTrackKnowledge: function() {
    this.trackKnowledge = { sectors: [], passingZones: [] };
    if (typeof racr.findSegment === 'function') {
      var sampleCount = 200;
      var trackLen = racr.params.trackLength || 10000;
      for (var i = 0; i < sampleCount; i++) {
        var pos = (trackLen / sampleCount) * i;
        var seg = racr.findSegment(pos);
        if (seg) {
          var curve = Math.abs(seg.curve);
          this.trackKnowledge.sectors.push({
            position: pos,
            curve: curve,
            isCorner: curve > 1.0,
            isHairpin: curve > 2.5,
            isStraight: curve < 0.2,
          });
        }
      }
    }
  },
  
  update: function(dt) {
    if (!this.settings.active) return;
    if (!racr.params.gameStart) {
      this.state.speed = 0;
      return;
    }
   
    
    var playerSpeed = racr.params.speed;
    var segment = racr.findSegment(this.state.position);
    
    // ===== TARGET SPEED CALCULATION =====
    var maxSpeed = racr.params.maxSpeed;
    var targetSpeed = maxSpeed * 0.95;
    
    if (segment) {
      var curve = Math.abs(segment.curve);
      if (curve > 3) {
        targetSpeed = maxSpeed * 0.85;
      } else if (curve > 2) {
        targetSpeed = maxSpeed * 0.92;
      } else if (curve > 1) {
        targetSpeed = maxSpeed * 0.96;
      }
    }
    
    // ===== SITUATIONAL ADJUSTMENTS =====
    var playerPos = racr.params.position + racr.params.playerZ;
    var gap = this.state.position - playerPos;
    this.state.distanceToPlayer = gap;
    
    var absGap = Math.abs(gap);
    
    if (gap < -100 && absGap < 2000) {
      this.state.status = 'hunting';
      targetSpeed *= 1.1;
      if (absGap < 400) {
        targetSpeed *= 1.05;
      }
    } else if (gap > 100 && absGap < 1000) {
      this.state.status = 'defending';
      targetSpeed *= 1.03;
    } else if (absGap <= 100) {
      this.state.status = 'battling';
      targetSpeed *= 1.1;
    } else {
      this.state.status = 'racing';
    }
    
    if (this.state.boostTimer > 0) {
      this.state.boostTimer -= dt * 1000;
      targetSpeed *= 1.25;
      if (this.state.boostTimer <= 0) {
        this.state.boostActive = false;
      }
    }
    
    // ===== ACTUAL ACCELERATION PHYSICS =====
    var speedDiff = targetSpeed - this.state.speed;
    var currentAccel = this.state.accel;
    
    if (this.state.status === 'hunting') {
      currentAccel = this.state.accel * 1.5;
    } else if (this.state.status === 'battling') {
      currentAccel = this.state.accel * 2.0;
    }
    
    if (speedDiff > 0) {
      this.state.speed = Util.accelerate(this.state.speed, currentAccel, dt);
    } else if (speedDiff < -50) {
      this.state.speed = Util.accelerate(this.state.speed, this.state.breaking * 0.5, dt);
    } else {
      this.state.speed = Util.accelerate(this.state.speed, this.state.decel * 0.5, dt);
    }
    
    var maxAllowed = maxSpeed * 1.3;
    this.state.speed = Math.max(0, Math.min(this.state.speed, maxAllowed));
    
    if (absGap < 500 && this.state.speed < playerSpeed * 0.9) {
      this.state.speed = playerSpeed * 0.9;
    }
    
    // ===== RACING LINE =====
    var idealX = 0;
    if (segment) {
      var curve = segment.curve;
      if (Math.abs(curve) < 0.2) {
        idealX = 0;
      } else if (curve > 0) {
        idealX = -0.6;
      } else {
        idealX = 0.6;
      }
    }
    
    if (segment && segment.cars) {
      for (var i = 0; i < segment.cars.length; i++) {
        var car = segment.cars[i];
        if (Math.abs(car.offset - this.state.playerX) < 0.3) {
          idealX = car.offset > 0 ? -0.8 : 0.8;
          break;
        }
      }
    }
    
    // ===== PLAYER-LIKE LANE CHANGE SYSTEM =====
    var laneDiff = idealX - this.state.playerX;
    
    if (Math.abs(laneDiff) > 0.1) {
      
      if (this.state._laneTween) {
        this.state._laneTween.kill();
      }
      
      var laneChangeSpeed = this.state.speed / 10000;
      if (laneChangeSpeed < 0.2) laneChangeSpeed = 0.2;
      
      var duration = racr.params.laneChangeTime * (this.state.playerX === 0 ? 1 : 2) / laneChangeSpeed / 1000;
      
      if (idealX < this.state.playerX) {
        this.state.steerLeft = true;
        this.state.steerRight = false;
        this.state.steerAmount = this.state.playerX > 0 ? 2 : 1;
      } else {
        this.state.steerRight = true;
        this.state.steerLeft = false;
        this.state.steerAmount = this.state.playerX < 0 ? 2 : 1;
      }
      
      var self = this;
      
      this.state._laneTween = TweenLite.to(this.state, duration, {
        playerX: idealX,
        ease: Linear.easeNone,
        onUpdate: function() {
          self.state.playerX = Math.max(-1, Math.min(1, self.state.playerX));
        },
        onComplete: function() {
          self.state.steerLeft = false;
          self.state.steerRight = false;
          self.state.steerAmount = 0;
          self.state._laneTween = null;
        }
      });
      
    } else {
      this.state.steerLeft = false;
      this.state.steerRight = false;
      this.state.steerAmount = 0;
    }
    
    // ===== OVERTAKE ATTEMPTS =====
    var timeSinceLastOvertake = Date.now() - this.state.lastOvertakeAttempt;
    if (gap < -50 && absGap < 400 && timeSinceLastOvertake > 2000) {
      if (Math.random() < 0.03) {
        this.attemptOvertake();
        this.state.lastOvertakeAttempt = Date.now();
      }
    }
    
    // ===== MISTAKES =====
    var timeSinceLastMistake = Date.now() - this.state.lastMistakeTime;
    if (Math.random() < 0.0005 * dt && timeSinceLastMistake > 3000) {
      this.makeMistake();
    }
    
    // ===== UPDATE POSITION =====
    this.state.position += this.state.speed * dt;
    
    if (this.state.position > racr.params.trackLength) {
      this.state.position -= racr.params.trackLength;
      this.state.currentLap++;
    }
    
    this.stats.speedSamples.push(this.state.speed);
    if (this.stats.speedSamples.length > 60) {
      this.stats.speedSamples.shift();
    }
    if (this.stats.speedSamples.length > 0) {
      this.stats.averageSpeed = this.stats.speedSamples.reduce((a,b) => a+b) / this.stats.speedSamples.length;
    }
  },
  
  attemptOvertake: function() {
    this.state.boostActive = true;
    this.state.boostTimer = 3000;
    this.stats.totalOvertakes++;
    console.log('⚡ RIVAL OVERTAKE! Speed:', Math.floor(this.state.speed/100), 'Player:', Math.floor(racr.params.speed/100));
  },
  
  makeMistake: function() {
    this.state.mistakes++;
    this.stats.totalMistakes++;
    this.state.lastMistakeTime = Date.now();
    this.state.confidence = 0.95;
    
    var mistake = Math.floor(Math.random() * 3);
    switch(mistake) {
      case 0:
        this.state.speed *= 0.9;
        break;
      case 1:
        this.state.playerX += (Math.random() > 0.5 ? 0.1 : -0.1);
        break;
      case 2:
        this.state.speed *= 0.95;
        break;
    }
  },
  
  getState: function() {
    return {
      position: this.state.position,
      playerX: this.state.playerX,
      speed: this.state.speed,
      distance: this.state.distanceToPlayer,
      name: this.name,
      car: this.state.car,
      status: this.state.status,
      boosting: this.state.boostActive,
    };
  },
  
  toggle: function() {
    this.settings.active = !this.settings.active;
    return this.settings.active;
  },
  
  setSkill: function(level) {
    switch(level) {
      case 'hard':
        this.state.accel = racr.params.maxSpeed / 4;  // Still faster than player (/5)
        break;
      case 'expert':
        this.state.accel = racr.params.maxSpeed / 3;
        break;
      case 'impossible':
        this.state.accel = racr.params.maxSpeed / 2;  // Twice as fast acceleration
        this.settings.mistakeRate = 0;
        break;
    }
    console.log('Rival set to', level, '- Accel:', this.state.accel, 'vs Player:', racr.params.accel);
  }
};

console.log('👑 EXPERT RivalSystem ready!');