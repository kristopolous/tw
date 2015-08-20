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
 * time / freshness
 * reputation
 * relevance - whether both words match
 * popularity

These have to be combined in some discrete and reasonable way.

## Open questions

### Distance 
It is probably not worth the effort to do actual distance based routing since ideally most vendors will be within a short walk (wherein one-way streets are not an issue).  It may be instructive, however, to do a rise over run style computation to account for a presumed grid. 

For instance, if place A is 500 meters away due 45 degrees northwest versus place B at 500 meters due solely north, it will probably take more footsteps and intersections to get to place A due to the fact that you can't just cut through buildings.  Communicating these two as "equal" in distance doesn't communicate the real value in travel, which is "equal in time to get there".  When people are asking for "nearest" they are asking for "smallest LOE and duration".

### Time/freshness
The real question is "What can I still get by the time I get there?"  Seeing a photograph of an item that will be out of stock, or from a vendor that will have moved on violates the users trust in the solution - even if it happens once.  The truly magic experience here is if the customer can rely on it.

### Reputation
The question is "Why should I share what I've found?"  You can incentivize people to share through magical internet points, potential windfalls from high loyalty (such as a discount or free item), or to be totally neoliberal, to somehow stroke their own entrepreneurial spirit. Of course, you can't over-incentivize sharing by some arbitrary metric lest you'll get low-quality or fraudulent shares.

This can be avoided I think if you implicitly ask the consumer who used the information about the relevancy of it.

### Relevance
Should there be a synonym relevance determination; e.g., should the cognitive proximity of "tacos" and "burritos" be a quantifiable metric to rank things? If so, what kind of weighting should be assigned to these clusters and how should that be determined?

### Popularity
Popularity: Is that a metric of similar words in close proximity at a short amount of time?  If so, what is that proximity, what is the time? These could be part of the feedback survey.  
  
The distinction between "Did you get the food quickly?" and "Was there a long line?" probably falls on the "Did you get the food quickly?".  Vendors such as Diddy Reise go through their long lines much quicker then say, Pinks Hot Dogs.  A long line is a poorer fidelity of value than asking for actual wait time.

## The follow up

