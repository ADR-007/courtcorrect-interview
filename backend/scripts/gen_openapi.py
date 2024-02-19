import yaml

from app.main import app

if __name__ == '__main__':
    print(yaml.dump(app.openapi()))
