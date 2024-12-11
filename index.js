const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

let watchList = [
  {
    videoId: 1,
    title: 'JavaScript Tutorial',
    watched: false,
    url: 'https://youtube.be/shorturl1',
  },
  {
    videoId: 2,
    title: 'Node.js Basics',
    watched: true,
    url: 'https://youtu.be/shorturl2',
  },
  {
    videoId: 3,
    title: 'React.js Guide',
    watched: false,
    url: 'https://youtu.be/shorturl3',
  },
];

function updateWatchedStatusById(watchList, videoId, watched) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchList[i].videoId === videoId) {
      watchList[i].watched = watched;
    }
  }
  return watchList;
}

app.get('/watchlist/update', (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let watched = req.query.watched === 'true';
  let result = updateWatchedStatusById(watchList, videoId, watched);
  res.json(result);
});

function updateWatchedStatusOfAllVideos(watchList, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched;
  }
  return watchList;
}

app.get('/watchlist/update-all', (req, res) => {
  let watched = req.query.watched === 'true';
  let result = updateWatchedStatusOfAllVideos(watchList, watched);
  res.json(result);
});

function shouldDeleteById(video, videoId) {
  return video.videoId != videoId;
}

app.get('/watchlist/delete', (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let result = watchList.filter((video) => shouldDeleteById(video, videoId));
  res.json(result);
});

function deleteWatchedVideos(video, watched) {
  return video.watched != watched;
}

app.get('/watchlist/delete-watched', (req, res) => {
  watched = req.query.watched === 'true';
  let result = watchlist.filter((video) => delteWatchedVideos(video, watched));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
