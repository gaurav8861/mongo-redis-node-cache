npm init <br />
npm install express --save<br />
npm install mongodb --save<br />
npm install redis --save<br />
docker run -d -p 6379:6379 --name redis1 redis<br />
docker pull mongo<br />
docker run -d -p 27017:27017 -v ~/data:/data/db mongo<br />

1.POST ==> localhost:8000/book <br />
{<br />
        "title":"t1", <br />
        "author":"a1",<br />
        "text":"tex1"<br />
}<br />

Response:<br />
Saved<br />
2. GET ==> localhost:8000/bookcache/t1<br />
Response :<br />
{<br />
    "_id": "5d7a90babc60d1310da885df",<br />
    "title": "t2",<br />
    "author": "a1",<br />
    "text": "tex1"<br />
}<br />
