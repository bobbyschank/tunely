# Sprint 4

"I feel like I'm too busy writing history to read it." -Kanye West

**User Story:**
Kanye would like to be able to delete an album.

## Overview

We've now finished **Create** and **Read** and are ready to add **Update** and **Delete**.  

This sprint we will:
* Add a button to delete an album.

> Note: as we go through this if you get stuck make use of the hints, your neighbors and the solutions.

> You must complete all of the previous sprint before starting this sprint. (excludes stretch challenges)

## Step 1: Delete button

Once again let's start on the front-end and add a button to delete an album.  

1. Add another button to the `panel-footer`.

1. Use jQuery to catch the `click` event for the button.

1. In your `click` event determine the album-id of the current album.  Just `console.log` it for now.

## Step 2: Delete route

Let's add a route for `DELETE /api/albums/:id` to our server.

1. Add the new route on the server side.  It should return just a [200 or 204 status code](http://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete).

> HTTP DELETE often [doesn't have a defined body.](http://tools.ietf.org/html/rfc7231#section-4.3.5)

1. Test it with curl or postman.

1. Connect it to the database and delete the specified album.


## Step 3: Connect client to server

Now you can tie the previous front-end and back-end changes together.  

1. When a user clicks the delete button, send a DELETE request to the server and remove the album from the page.

> Note jQuery doesn't have a `$.delete` method.  Use `$.ajax`

1. Remove the deleted albums from the page.

1. Refresh the page and make sure they are truly being deleted.  

> If you run out of things to delete, try re-seeding your database.


## Challenges

1. Prompt the user with an alert "Are you sure?" when they click delete.
  * for a superior look and feel, use a bootstrap modal for this prompt

1. Add an animation for album deletion.
