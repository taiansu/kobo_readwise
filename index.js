import axios from 'axios';
import R from 'ramda';
import database from './database.js';

import { createRequire } from 'module'; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const { accessToken } = require('./config.json'); // use the require method

function entry() {
  getBookmarks(database)
    .then(processAndSend)
    .finally(() => { database.destroy() });
}

function getBookmarks(db) {
  return db.from('Bookmark')
           .innerJoin('content', 'Bookmark.VolumeID', 'content.ContentID')
           .select('*');
}

function processAndSend(bookmarks) {
  return R.pipe(
            R.filter(validBookmark),
            R.map(toReadwiseHighlight),
            wrapToHighlights,
            postToReadwise
         )(bookmarks);
}

function toReadwiseHighlight({
  Text: text,
  Title: title,
  Attribution: attributions,
  DateCreated: dateCreated,
  StartContainerPath: startPath,
  ISBN
}) {
  return R.mergeLeft(toLocationProp(startPath), {
    text, title,
    source_type: 'book',
    author: toAuthor(attributions),
    highlighted_at: toHighlightedAt(dateCreated),
    ISBN
  });
}

function wrapToHighlights(highlights) {
  return { 'highlights': highlights }
}

async function postToReadwise(data) {
  try {
    const resp = await axios({
      method: 'post',
      baseURL: 'https://readwise.io/api/v2',
      url: '/highlights',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${accessToken}`
      },
      data: JSON.stringify(data)
    })

    if (resp.status === 200) {
      console.log('✅ Successfully send bookmarks fom KOBO eReader to Readwise, enjoy!\n\n');
    }
  } catch(err) {
    console.log('Something went wrong: ', err)
    process.exit(1);
  }
}

function toLocationProp(path) {
  const rgx = /span#kobo\\\.(\d+)\\\.\d+/;
  if (rgx.test(path)) {
    return { location_type: 'page', location: rgx.exec(path)[1] }
  } else {
    return {};
  }
}

function validBookmark({Text: t}) {
  return t !== null && !t.match(/###MARKUP###/);
}

function toAuthor(attributions) {
  return attributions.split(',')[0].trim();
}

function toHighlightedAt(datetime) {
  return datetime;
}

export default entry;
