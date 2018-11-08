import boto3
import os
import time


def terminate_instances():
    with open('deleteme', 'r') as f:
        instances = f.read()

    instances = instances.split()
    if not instances:
        print('No instances found to terminate')
        return

    client = boto3.client('ec2')
    response = client.terminate_instances(
        InstanceIds=[instance for instance in instances],
    )
    print(response)


def check_status():
    with open('newmachineid', 'r') as f:
        instance_id = f.read().strip()
    iterations = 0
    client = boto3.client('elbv2')
    limit = 360

    while True:
        iterations += 1
        response = client.describe_target_health(
            TargetGroupArn=os.environ['TGT_GROUP'],
            Targets=[{
                'Id': instance_id,
                'Port': 3000
            }]
        )

        status = response['TargetHealthDescriptions'][0]['TargetHealth']['State']
        print(iterations, status)

        if iterations > limit:
            raise Exception('Service error')
        if status == 'healthy':
            break
        time.sleep(1)

    terminate_instances()


if __name__ == '__main__':
    check_status()
