# SPO_Hackathon

This is my submission for the SPO Hackathon. 

I decieded to do the "Research and develop a benchmarking system for the RAS and/or generate insights to improve its performance and capabilities" PS. 

Here are the reults. 

I performed two tests, those are, stress test and load tests. 

## Load Test

* I loaded the portal with 200 requests which looped for 10 turns. 
* A total of 2000 requests.
* I found that the server gave aprx 8-9% error on such a load for about a minute.

## Stress Test

*Then I stressed the portal with 250 request which looped for 10 turns. 
*A total of 2500 requests. 
*I found that the server gave aprx 10-11% error on such a load for about a minute.

More detail description are in the stress and load folders.

## Improvements
I wanted to try out other forms of network testing such as secruity as well as endurance but my resources (spl time) were lacking.

## Takeaway
One interesting observation though, since the portal does not use dynamic token allocation which makes it easy for anyone to grab the token of a user using a script and potentially gain access into thier accounts. 
