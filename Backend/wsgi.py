from app import app
import os

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))  # default to 5000 if PORT is not set
    app.run(port=port, debug=True)
