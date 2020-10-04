# tournamentTools

This repo was mostly made for my web-based tournament tools that I will be using at [RFLan](https://rflan.org), mostly to make my job and other peoples job much more easy.

### Backstory

It all started off working on a PUBG Match parser while in a RFLan Volunteer meeting, I volunteered to manage PUBG and I was wondering if there was an API for PUBG that could make my job 100x more easy. So that is what I did, created a prototype of [pubg-node](https://github.com/jylescoad-ward/pubg-api) in about an hour.

The following days after that was just polishing the turd of a prototype that I made. Sadly that prototype does not work anymore (not sure why), so recently I had the urge to create something so I started working on this, tournamentTools. A Web-based Parser, Viewer, and Exporter for PUBG Matches and Users. Everything runs in your browser with the help of [webpack](https://github.com/webpack/webpack) a node module that packs lots of Javascript and CSS files (only using the javascript side of webpack) into one so you can speed up your website (don't really care about that) and use node.js modules (that's the one I care about).


### Installation

To install tournamentTools you need two things;
1. Cheap VPS (PUBG API proxy) **(optional)**
2. Somewhere to host the website (I suggest [Github Pages](https://pages.github.com/) or [Neocities](https://neocities.org), both are free. If you want you can also)

When it comes to hosting the [actual website](./public/dist/) I suggest [Neocities](https://neocities.org), which are both free.
If you don't want to do that you can rent a VPS and host the website along with your own API Proxy if you don't trust me.

#### Installing the Website on Neocities
First of all you have to create an account on Neocities to actually host the website. It's pretty straight forward.


Create an account by typing in the name of your website (I did tournamentTools), you can choose anything, as long as it has letters and numbers *only*. Once you have done that, fill out the rest of the fields with your information.

![image1](http://cdn.jyles.club/github/tournamentTools/g_1.png)

![image2](http://cdn.jyles.club/github/tournamentTools/g_2.png)


Once you have done that, click on the checkbox that says "I'm not a robot". When you do this you will have to match words with pictures for verification.
When you are ready click on "Create My Site" to create your site, it will redirect you to this page. Click on Continue below in the Free Option.

![image2_1](http://cdn.jyles.club/github/tournamentTools/g_2_1.png)

Then it will take you to this page to verify your email. This can take a bit and make sure you check your spam.

![image3](http://cdn.jyles.club/github/tournamentTools/g_3.png)

When you get the email copy the code and put it in the text box below the label "Email Confirmation Token"

![image4](http://cdn.jyles.club/github/tournamentTools/g_4.png)

![image5](http://cdn.jyles.club/github/tournamentTools/g_5.png)


When you're ready click on Confirm Email, it will take you to this page.

![image6](http://cdn.jyles.club/github/tournamentTools/g_6.png)


Hover over your website name in the top right and click on "Edit site".

![image7](http://cdn.jyles.club/github/tournamentTools/g_7.png)


Once that is done you can drag and drop the contents of the "public/dist/" folder into the area below the blue toolbar.

![image8](http://cdn.jyles.club/github/tournamentTools/g_8.png)


After the files have uploaded you can click on the website link below the text "PUBG Tournament Tools" at the top of the page. This will redirect you to the website.
If all goes well you will see this open up on another tab, Once that is done all you need to do is click on the Settings dropdown and the website will help you with the rest.

![image9](http://cdn.jyles.club/github/tournamentTools/g_9.png)
