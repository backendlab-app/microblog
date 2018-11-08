# BackendLab microblog

> A simple microblogging app based on BackendLab: https://www.backendlab.app/

## Installation

### Creating the backend

1. First, go to https://www.backendlab.app and sign up for a free account and login

2. From your BackendLab home page, click **Create new app** and call it *microblog*

![create-app][create-app]

3. Click on the Groups icon on the left hand side of the screen. Create a new group called *Microblog users*

![create-group][create-group]

3. Go into your *microblog* app, click the **Create model** button and create a new model called *post*. Using the **Add new field** button, add the following fields to your *posts* model:
- Name: Content, field type: String
- Name: Author, field type: ForeignKey, related model: User (sytem model), related name: posts
- Name Date created, field type: DateTime, set on create: True

![post-model][post-model]

4. Go to the **Permissions** tab. Create a new permissions object for the *Microblog users* group, granting access to create, and read permissions

![post-permissions][post-permissions]

5. Create another new model called *comment*. Add the following fields to it:
- Name: Content, field type: String
- Name: post, field type: ForeignKey, related model: *post*, related name: comments
- Name: Author, field type: ForeignKey, related model: User (sytem model), related name: comments
- Name Date created, field type: DateTime, set on create: True

![comment-model][comment-model]

6. Go to the permissions tab and apply the same permissions as the *post* model

7. Go to the users tab and create a few user objects.  

8. Go to the **endpoints** tab and make a note of your customer ID (the hash immediately after the URL root, highlighted in red)

![endpoints][endpoints]


[create-app]: https://github.com/backendlab-app/microblog/blob/master/screenshots/Screen%20Shot%202018-11-02%20at%2020.40.52.png

[create-group]: https://github.com/backendlab-app/microblog/blob/master/screenshots/create-group.png

[post-model]: https://github.com/backendlab-app/microblog/blob/master/screenshots/post-model.png

[post-permissions]: https://github.com/backendlab-app/microblog/blob/master/screenshots/post-permissions.png

[comment-model]: https://github.com/backendlab-app/microblog/blob/master/screenshots/comment-model.png

[endpoints]: https://github.com/backendlab-app/microblog/blob/master/screenshots/endpoints.png

### Creating the front end

9. Your backend is now ready. Clone the repository, and install the requirements:
```
$ git clone https://github.com/backendlab-app/microblog.git
$ cd microblod
$ npm install
```

10. Create a file called `.env` in the microblog folder, and populate your credentials as follows:
```
CUSTOMER_ID=[customer id from step 8]
ADMIN_USER=[the email address you signed up for BackendLab with]
ADMIN_PASS=[the password address you signed up for BackendLab with]
```

11. Start the app, then go to `http://localhost:3000`
```
npm run dev
```
