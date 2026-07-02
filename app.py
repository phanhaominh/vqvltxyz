from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Serve static files from the root directory
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

# Root route - serves root.html
@app.route('/')
def root():
    return send_from_directory('.', 'index.html')

# Home route - serves home.html
@app.route('/home')
def home():
    return send_from_directory('.', 'home.html')

# Forum route - serves forum.html
@app.route('/forum')
def forum():
    return send_from_directory('.', 'forum.html')

# DVD route - serves DVD.html
@app.route('/dvd')
def dvd():
    return send_from_directory('.', 'DVD.html')

# Shop route - serves shop.html
@app.route('/shop')
def shop():
    return send_from_directory('.', 'shop.html')

# About route - serves about.html
@app.route('/about')
def about():
    return send_from_directory('.', 'about.html')

# Contact route - serves contact.html
@app.route('/contact')
def contact():
    return send_from_directory('.', 'contact.html')

# Terms route - serves terms.html
@app.route('/terms')
def terms():
    return send_from_directory('.', 'terms.html')

# Privacy route - serves privacy.html
@app.route('/privacy')
def privacy():
    return send_from_directory('.', 'privacy.html')

# Login route - serves login.html
@app.route('/login')
def login():
    return send_from_directory('.', 'login.html')

# Vault route - serves vault.html
@app.route('/vault')
def vault():
    return send_from_directory('.', 'vault.html')

# Media route - serves media.html
@app.route('/media')
def media():
    return send_from_directory('.', 'media.html')

# Tools route - serves tools.html
@app.route('/tools')
def tools():
    return send_from_directory('.', 'tools.html')

# Lost route - serves lost.html
@app.route('/lost')
def lost():
    return send_from_directory('.', 'lost.html')

# Telegram route - serves telegram.html
@app.route('/telegram')
def telegram():
    return send_from_directory('.', 'telegram.html')

# Artists route - serves artists.html
@app.route('/artists')
def artists():
    return send_from_directory('.', 'artists.html')

# Videos route - serves videos.html
@app.route('/videos')
def videos():
    return send_from_directory('.', 'videos.html')

# Chug route - serves chug.html
@app.route('/chug')
def chug():
    return send_from_directory('.', 'chug.html')

# c_video_list route - serves c_video_list.html
@app.route('/c_video_list')
def c_video_list():
    return send_from_directory('.', 'c_video_list.html')

# c_pic_list route - serves c_pic_list.html
@app.route('/c_pic_list')
def c_pic_list():
    return send_from_directory('.', 'c_pic_list.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000) 