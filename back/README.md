thoughts:

 * real-time results
 * word stemming (snowball)
 * frequent search terms like google instant
 * sorting

http://stackoverflow.com/questions/19107614/how-to-use-redis-and-geo-proximity-search-to-find-two-users-at-the-same-location

This may be a good move

There's also https://matt.sh/redis-geo

The idea is to have keys be stemmed words 

So there are five sortings:
  
 * distance
 * time
 * reputation
 * relevance - whether both words match
 * popularity

These have to be combined in some discrete and reasonable way.

Open questions:
  Should there be a synonym relevance determination; e.g., should the cognitive proximity of "tacos" and "burritos" be a quantifiable metric to rank things? If so, what kind of weighting should be assigned to these clusters and how should that be determined?

  Popularity: Is that a metric of similar words in close proximity at a short amount of time?  If so, what is that proximity, what is the time? These could be part of the feedback survey.  
  
  The distinction between "Did you get the food quickly?" and "Was there a long line?" probably falls on the "Did you get the food quickly?".  Vendors such as Diddy Reise go through their long lines much quicker then say, Pinks Hot Dogs.  A long line is a poorer fidelity of value than asking for actual wait time.
