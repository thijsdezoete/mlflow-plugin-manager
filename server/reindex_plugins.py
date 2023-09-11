import requests
from pprint import pprint
from app import db, Plugin, app

def all_packages(term='mlflow'):

    url = "https://pypi.org/simple/"
    headers = {
        'Accept': 'application/vnd.pypi.simple.v1+json',
    }

    response = requests.get(url, headers=headers)
    names = [x['name'] for x in response.json()['projects'] if term in x['name']]

    terms = []
    for name in names:
        my_term = {}
        response = requests.get(url + name + "/", headers=headers).json()
        # pprint(response)
        my_term[name] = response['versions']
        terms.append((name, response['versions']))

    return terms

def reindex_plugins():

    with app.app_context():
        relevant_plugins = all_packages()

        added_count = 0
        for plugin_name, plugin_versions in relevant_plugins:
            # Get versions for each plugin

            for version in plugin_versions:
                if not Plugin.query.filter_by(name=plugin_name, version=version).first():
                    print(f"Adding: {plugin_name} (v{version})!")
                    new_plugin = Plugin(name=plugin_name, version=version)
                    db.session.add(new_plugin)
                    added_count += 1

        db.session.commit()
        print(f"Successfully re-indexed {added_count} plugin versions!")

if __name__ == "__main__":
    reindex_plugins()
    # all_packages()

