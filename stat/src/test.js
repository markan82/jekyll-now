const steem = require('steem');

const query = {
  tag: 'anpigon',
  limit: 10
}
// steem.api.getBlog('anpigon', -1, 10, function(e,r){console.log(e,r)})
steem.api.getDiscussionsByBlogAsync(query).then(r => {
  // console.log(r)
  const dayStat = {}
  const timeStat = {}
  const times = r.forEach(item => {
    //console.log(e.active_votes);
    return item.active_votes.forEach(vote => {
      const time = new Date(`${vote.time}Z`)
      const hour = time.getHours()
      console.log(time, hour)
      if(!timeStat[hour]) timeStat[hour] = 0
      timeStat[hour] += 1
    })
  });
  console.log(timeStat)
})