import json
import os

with open('old_instances.json', 'r') as f:
    content = f.read()

APP = os.environ['CI_PROJECT_NAME']
prefix = APP
print('Will delete instances called %s-*' % prefix)


def clean_tags(raw):
    output = {}
    for tag in raw:
        output[tag['Key']] = tag['Value']
    return output


data = json.loads(content)

ids_to_delete = []
for res in data['Reservations']:
    for instance in res['Instances']:
        tags = clean_tags(instance.get('Tags', {}))
        name = tags.get('Name', '')

        if name.startswith(prefix):
            ids_to_delete.append(instance['InstanceId'])


with open('deleteme', 'w') as f:
    f.write(' '.join(ids_to_delete))

