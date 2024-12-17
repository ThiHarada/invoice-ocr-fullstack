# Invoice uploader and reader app

This project is a complete fullstack app for uploading and reading invoice images (and any other image at that). This was made for a case for a internship selective process. It includes a login and register authentication system with a local database made in SQLite and used with Prisma ORM for both login data and to store the invoices. The invoice reader uses Tesseract OCR, an open-source Optical Character Recognition tool that turns the images into text.


# Running the app locally

To run the app locally, you will need to have Tesseract installed, you can check their installation guide [Here.](https://tesseract-ocr.github.io/tessdoc/Installation.html)

Other than that, you will need npm installed as well.
After that, run the following command lines from the root directory of this repo:
`cd apps/api`
`prisma generate`
This will ensure that Prisma has all of its schemas and necessary data to run behind the app.

You will also need to set the .env files up.
Just create two different `.env` files, one inside `apps/web` and the other in `apps/api`, each with its own contents:

**apps/api/.env:**
DATABASE_URL="file:./dev.db"
JWT_SECRET=pZIXZXa9lFTwp9PheZSo4uWlXQgI03rc5mJjx3d4BYQ=
JWT_EXPIRES_IN=7d
REFRESH_JWT_SECRET=aWejyW2eexPcy9a122KcXjaWelNPlBdDyF6IFL9YuCA=
REFRESH_EXPIRES_IN=7d

**apps/web/.env**
NEXT_PUBLIC_API_URL=http://localhost:8000
SESSION_SECRET_KEY=iPtpqCoosch4phBLB9VxDPaLoXeiyKqO0Njwlms20Ls=

I know this is a lot, but we're almost done.

After that is as simple as running:
`npm run dev` 
in the root directory

If something goes wrong you can check the logs, it will probably be an issue with installing a nestjs package, the logs will guide you through this.

## Future features
Apart from the current features implemented in this project, I also intend on adding some kind of integration with a LLM for you to be able to ask it for context for your invoices. 

Some other elements I would like to add are:
 - Some more Front-end elements to serve as feedback to the user when uploading a file, for example
 - Better file uploading routines, as the current is quite limited in terms of file size uploading.
  

