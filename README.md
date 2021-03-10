# Send random Google Photos image

This script takes a random image from a Google Photos album and sends it as an email attachment.

This allows you to use Google Photos with services like IFTTT which doesn’t support Google Photos.

**Note:**
This script is based off of [dfkoz's](https://gist.github.com/dfkoz/5860786) and Ben Lind's [gist](https://github.com/benlind/random-image-emailer).

Ben Lind's script sends images inline. In this version, images are sent as attachments. A lot of code has been rewritten to use Google Photos as a source instead.

# Usage

0. Must have a Google Photos album
1. Log into Google Drive, and click CREATE -> Script -> Blank Project.
2. Delete all of the default code, and paste the code in `random-image-emailer.gs` into your project.
3. Create another file `appsscript.json` and copy the contents from this repo.
4. Follow the instructions in `random-image-emailer.gs` to get the albumID and put it in.
5. You may also need to create a Google Cloud Platform project. This will allow you to create a test credential to link to this project.
6. You can test the script by selecting Run -> sendRandomImage.
7. Click Resources -> Current Project's Triggers, and set up the email to run as often as you would like.
