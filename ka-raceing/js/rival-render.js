// rival-render.js - MATCHES amg.js CAR SYSTEM EXACTLY
console.log('rival-render.js loaded!');

var RivalRender = {
  isOnScreen: false,
  lastScreenX: 0,
  lastScreenY: 0,
  
  render: function(ctx, width, height) {
    if (typeof RivalSystem === 'undefined' || !RivalSystem.settings.active) return;
    
    var rival = RivalSystem.getState();
    if (!rival || rival.speed <= 0) return;
    
    var rivalSegment = racr.findSegment(rival.position);
    if (!rivalSegment) return;
    
    var baseSegment = racr.findSegment(racr.params.position);
    var basePercent = Util.percentRemaining(racr.params.position, racr.params.segmentLength);
    
    var segmentDiff = rivalSegment.index - baseSegment.index;
    if (segmentDiff < 0) segmentDiff += racr.segments.length;
    
    if (segmentDiff >= racr.params.drawDistance || segmentDiff <= 0) {
      this.isOnScreen = false;
      return;
    }
    
    var x = 0;
    var dx = -(baseSegment.curve * basePercent);
    for (var n = 0; n < segmentDiff; n++) {
      x = x + dx;
      dx = dx + racr.segments[(baseSegment.index + n) % racr.segments.length].curve;
    }
    
    var p1 = { world: { y: rivalSegment.p1.world.y, z: rivalSegment.p1.world.z }, camera: {}, screen: {} };
    var p2 = { world: { y: rivalSegment.p2.world.y, z: rivalSegment.p2.world.z }, camera: {}, screen: {} };
    
    Util.project(p1, 
      (racr.params.playerX * racr.params.roadWidth) - x,
      racr.params.playerY + racr.params.cameraHeight,
      racr.params.position,
      racr.params.cameraDepth,
      racr.params.width,
      racr.params.height,
      racr.params.roadWidth
    );
    
    Util.project(p2,
      (racr.params.playerX * racr.params.roadWidth) - x - dx,
      racr.params.playerY + racr.params.cameraHeight,
      racr.params.position,
      racr.params.cameraDepth,
      racr.params.width,
      racr.params.height,
      racr.params.roadWidth
    );
    
    var rivalPercent = Util.percentRemaining(rival.position, racr.params.segmentLength);
    var spriteScale = Util.interpolate(p1.screen.scale, p2.screen.scale, rivalPercent);
    var screenX = Util.interpolate(p1.screen.x, p2.screen.x, rivalPercent) + 
                  (spriteScale * rival.playerX * racr.params.roadWidth * racr.params.width / 2);
    var screenY = Util.interpolate(p1.screen.y, p2.screen.y, rivalPercent);
    
    this.lastScreenX = screenX;
    this.lastScreenY = screenY;
    this.isOnScreen = (screenY < height && screenY > 0 && screenX > 0 && screenX < width);
    
    if (!this.isOnScreen) return;
    
    // *** CAR DIRECTION BASED ON STEERING (LIKE PLAYER) ***
    var direction = 'STRAIGHT';
    
    // Check if rival is actively steering
    if (rival.steerLeft) {
      direction = (rival.steerAmount >= 2) ? 'FARLEFT' : 'LEFT';
    } else if (rival.steerRight) {
      direction = (rival.steerAmount >= 2) ? 'FARRIGHT' : 'RIGHT';
    } else {
      // Not steering - use curve for passive direction
      if (rivalSegment.curve > 2) {
        direction = 'RIGHT';
      } else if (rivalSegment.curve < -2) {
        direction = 'LEFT';
      } else if (rivalSegment.curve > 1) {
        direction = 'RIGHT';
      } else if (rivalSegment.curve < -1) {
        direction = 'LEFT';
      }
    }
    
    // Get car image EXACTLY like the game does
    var carImage = racr.trafficImages[rival.car + '_' + direction];
    
    // Fallback chain (same as game)
    if (!carImage) {
      carImage = racr.trafficImages[rival.car + '_STRAIGHT'];
    }
    if (!carImage) {
      carImage = racr.trafficImages['RENNTEAM_STRAIGHT'];
    }
    
    // Draw with ghost effect
    ctx.save();
    ctx.globalAlpha = 0.7;
    
    if (carImage) {
      var CAR_BASE_HEIGHT = 240;
      var CAR_SCALE = 0.3 * (1/CAR_BASE_HEIGHT);
      var destH = (CAR_BASE_HEIGHT * spriteScale * racr.params.width/2) * (CAR_SCALE * racr.params.roadWidth);
      var destW = destH * (carImage.width / carImage.height);
      var destX = screenX - destW/2;
      var destY = screenY - destH;
      
      ctx.drawImage(carImage, destX, destY, destW, destH);
      
      // Name tag above car
      ctx.font = 'bold 12px Arial';
      ctx.fillStyle = '#ff4444';
      ctx.textAlign = 'center';
      ctx.fillText(rival.name || 'RIVAL', screenX, destY - 5);
      
      // Status indicator
      if (rival.status === 'battling') {
        ctx.fillStyle = '#ffff00';
        ctx.fillText('⚡', screenX, destY - 20);
      } else if (rival.status === 'hunting') {
        ctx.fillStyle = '#ff8800';
        ctx.fillText('🔍', screenX, destY - 20);
      } else if (rival.boosting) {
        ctx.fillStyle = '#00ffff';
        ctx.fillText('💨', screenX, destY - 20);
      }
    }
    
    ctx.restore();
  },

  // Add this at the top of RivalRender object
  hudAlpha: 0,
  hudFadeStart: 0,
  
  renderHUD: function() {
    if (!racr.params.begin) {
      this.hudAlpha = 0;
      return;
    }
    
    if (!RivalSystem.settings.active) return;
    
    // Start fade when race begins
    if (this.hudFadeStart === 0) {
      this.hudFadeStart = Date.now();
    }
    
    // Fade in over 1.5 seconds
    var elapsed = (Date.now() - this.hudFadeStart) / 1000;
    this.hudAlpha = Math.min(1, elapsed / 1.5);
    
    var ctx = racr.ctx;
    var rival = RivalSystem.getState();
    if (!rival) return;
    
    ctx.save();
    ctx.globalAlpha = this.hudAlpha;
    
    // Background box
    var boxX = racr.params.width - 240;
    var boxY = 30;
    var boxW = 220;
    var boxH = 55;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(boxX, boxY, boxW, boxH);
    
    // Border color based on position
    var borderColor = '#ffffff';
    if (rival.distance > 50) {
      borderColor = '#ff4444';
    } else if (rival.distance < -50) {
      borderColor = '#44ff44';
    } else {
      borderColor = '#ffff44';
    }
    
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, boxW, boxH);
    
    // Status text
    var timeDiff = Math.abs(rival.distance) / racr.params.maxSpeed;
    var statusText = '';
    var statusColor = '';
    
    if (rival.distance > 50) {
      statusText = '▼ RIVAL AHEAD ' + timeDiff.toFixed(1) + 's';
      statusColor = '#ff4444';
    } else if (rival.distance < -50) {
      statusText = '▲ YOU LEAD ' + timeDiff.toFixed(1) + 's';
      statusColor = '#44ff44';
    } else {
      statusText = '⚡ NECK AND NECK!';
      statusColor = '#ffff44';
    }
    
    ctx.fillStyle = statusColor;
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(statusText, boxX + boxW/2, boxY + 18);
    
    // Rival name and status
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px Arial';
    var nameText = rival.name || 'Rival';
    if (rival.status) {
      nameText += ' [' + rival.status.toUpperCase() + ']';
    }
    ctx.fillText(nameText, boxX + boxW/2, boxY + 38);
    
    // Speed comparison
    ctx.fillStyle = '#aaaaaa';
    ctx.font = '10px Arial';
    var rivalSpeedKmh = Math.floor(rival.speed / 100);
    ctx.fillText('Rival: ' + rivalSpeedKmh + ' km/h', boxX + boxW/2, boxY + 50);
    
    ctx.restore();
  },
};

console.log('RivalRender ready:', RivalRender);