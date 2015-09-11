Just make a user ... anything will do, don't need fb auth working

## arch

This is also going to serve as a bootstrap to a modern stack.

    /* docker */ + express + angular 

socket.io may not be necessary or prudent.  I've got nothing against it, just don't know.

## storage

No matter what is used for searching, everything should be archived to do stats and analytics on for the paid vendor versions.

rdbms db:

 * posts - [ who, what, where, when, popularity, entry? ]
 * queries - [ who, what, where, when, success ]
 * users 

Probably mysql + redis, although elastic search is the new hotness (I don't think this is a valid application of it)

Having expiry on entries seems to be a good idea ... mongo has this ... redis's methodology is key-wide.

Also there's a question about the facet-ness of the search (see below) the issue is that redis may not have an obvious way to do this.

There's the zset based method but that doesn't preference time - unless we want all the results which exist in the db to have an equal footing.


Differentiation between user and vendor?

 * This permits a user to communicate directly with a vendor, saying "OMW" where the vendor can see where the person is and their estimated time of arrival ... uber-esque

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

# Real-time results
If we are showing images in the real-time google-instant like results, we have to not be stupid and push excessive data down to the user
in a way that makes the experience slow.  The very purpose of this feature is to provide instant, immediate feedback.

# Stemming
There may be value in making sure that the dictionary is only composed of words that have been "found" before.  This approach is better
than a prebaked dictionary because it allows for slang and at the same time doesn't permit bad spellings to be auto-corrected to absurd words that would never appear.

# frequent search terms
This is the idea of suggesting terms to search for which may be geo-spatially an chrono-spacially popular at that moment ... under the 
auspices that there is an immediate geo and temporally specific notion of popularity

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
It seems to become increasingly relevant that a followup is done with a user who executes a search on if they

 * received good information 
 * found what they were looking for
 * were happy with the experience

It would be preferable to make this as easy as possible and be able to imply as much of this from the question as possible

Let's make a table

          | y n | y n | y n | y n | y n | y n | y n | y n 
    ------+-----+-----+-----+-----+-----+-----+-----+-----
    info  | x   | x   | x   | x   |   x |   x |   x |   x
    found | x   | x   |   x |   x | x   | x   |   x |   x
    happy | x   |   x | x   |   x | x   |   x | x   |   x
    ------+-----+-----+-----+-----+-----+-----+-----+-----
    case# |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8

Briefly discussing what would lead to each case:

#### 1 The information was good, they found it, and were happy with the results.
Pat ourselves on the back, we can go home.  Also, if there's a reputational element that the poster can receive, this is the time to give it.

#### 2 The information was good, they found it, and were not happy with the results
These users are pobably just picky and can probably be ignored.  But we may ask them why
  
#### 3 The information was good, they did not find it, and are happy with the results
This is probably outside the scope of the application although it's an interesting question.  The use-case here, that is more of an intellectual exercise would be when a user found something better through traditional means and thus was OK with the failed pursuit.

Regardless, this most certainly means that they will be less likely to turn to the application in the future. 

#### 4 The information was good, they did not find it, and are not happy
I don't think this is a logical possibility other than if they are commenting on the usability of the application.  It may be possible that they just couldn't figure out how to navigate themselves to the place.  If this is the case, then it's a UI and flow problem.

#### 5 The information was bad, they did find it, and are happy
In this case, the app failed so miserably that the person was able to find it without using the app.  That's a failure of the core business and should be dealt with in a similar way as case #8 below.

#### 6 The information was bad, they did find it, and are not happy
This is really quite similar to use-case 2 although if we aren't careful, this could mean they were frustrated with the app AS A PART of the overall experience which then will reflect poorly on the vendor in a way that the vendor would DILIBERATELY DISTANCE themselves from the product.  This is also a terrible thing.

#### 7 The information was bad, they did not find it, and are happy
I think we're dealing with another logical impossibility.

#### 8 The information was bad, they did not find it, and are not happy
The absolute worst case - this is the opportunity to get the most information one can from the customer because there's a huge need to correct things.  Since they've already established themselves as a user of the software, they maybe 

 * Don't know how to interface it
 * Received a promise that didn't come through in their mind
 * Ran into a major bug.

In any of these cases, the user experience testimonial here is gold dust ... it's probably not too much to ask the user for their email address to open up a dialog on what happened.

## Endpoints

    GET /find/(query)
    {
      query: (query),
      res: [ ... ]
    }

    GET /suggest/(query)
    {
      query: (query),
      res: [ ... ]
    }

    POST /found
    {
      lat:
      long:
      user??
      words:
      img
    }

In the feedback system where you post that you've found something, backlinking it to the thing that led you there is pretty high
quality information.

Having an admin option within the app may be the way to go.
Does laravel play a role for the financials and dashboard?
How to quantify gain through app... you can see how many people searched and then successfully bought
The follow-thru feature is absolutely crucial


There should be a way to post anonymously or log in through fb/twitter/ig? ... anonymous users have the same session though to
prevent spammy abuse.

Traditional RDBMS for accounts - should have followers / friends twitter-like settings
optional post-to-twitter (fb? probably not) (ig? maybe?)

### customer opportunities

there's value in proposing to vendors a gauranteed minimum sale and value to vendors in knowing the parking situation.

Also demographics are important to some vendors ... age and gender maybe --- these may be of low value but if we can get them
there should be a way to store them.

TODO: payment gateway, accounts of paying members
  Intelligence dashboard
  Create mock data
  email reminders of payment

merchant accounts: http://www.digitalmarketer.com/paypal-vs-stripe-vs-merchant-account/

Technical budget:

VPS      20.0000 
CDN       0.4590  (assumes 250k images at $0.0450 / GB)
SMS       5.4000  (assumes 1,0000 @ $0.0054 / msg)
mailgun   0.0000  ???
android   2.0833  (25/yr)
ios       8.2500  (99/yr)
domain    5.4167  (65/yr)

base-level: $40/month

CDN survey: http://cdnsun.com/pricing appears to be < https://www.keycdn.com/pricing

~ $0.04/gb ~= 25,000 images

sms gateway: https://www.nexmo.com/pricing/
  
$0.0054/msg - have to think about two things:
  base level cost on a per customer basis for having this service
  average number of outbounds on a close and per month

Also, uber, which does this, doesn't have a direct customer, client engagement which makes sense because it has to be
transactional.  The problem is that if it just just a proxy, there's no threading for sms so there's no way to differentiate
one customer from another ... you need to keep things either controlled and number agnostic, or linked to an app for the conversation.

Encouraging in-app conversations will be advantageous because there's a value add.  You can know the location of the customer along
with a verifiable record and identity.  It's a better hairbinger of trust for the veracity of the customer, from the vendors perspective

## Data Model

users
  auth token
  account type
  id
  name
  email
  phone number
  active/inactive
  join date

messages
  from
  to
  what
  when
  where
  how - transport 

posts
  what 
    2 words
    vendor tag
    image
  who
  where
  when

feedback - todo
  note: these are the three things we are looking for.  In the crudest sense
  they are binary, although that's a poor level of information.

  info
  found
  happy

testing / orm


workflow for scheduling may be important
