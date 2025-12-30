import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, HeartHandshake, Droplets, HandCoins, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const publicImage = (p) => `${process.env.PUBLIC_URL}/pictures/${p}`;

const imgBookshelf = publicImage('2016-08/2016-1.jpg');
const imgPacked = publicImage('2016-08/2016-2.jpg');
const imgShippment = publicImage('2016-08/2016-3.jpg');
const imgArrival = publicImage('2016-08/2016-4.jpg');
const imgBooksReady = publicImage('2016-08/2016-5.jpg');
const imgBookCorner = publicImage('2016-08/2016-6.jpg');
const imgHomeVisit = publicImage('2016-08/2016-7.jpg');
const imgSchoolVisit = publicImage('2016-08/2016-8.jpg');

const imgGather = publicImage('2016-07/2016-1.jpg');
const imgCommunityEngagement = publicImage('2016-07/2016-2.jpg');
const imgMoments = publicImage('2016-07/2016-3.jpg');
const imgSupport = publicImage('2016-07/2016-4.jpg');
const imgProfessional = publicImage('2016-07/2016-5.jpg');

const imgBookDonationEvent = publicImage('2016-05/2016-1.jpg');
const imgGrowRecognition = publicImage('2016-05/2016-2.jpg');
const imgLessonsBeyondClassroom = publicImage('2016-05/2016-3.jpg');
const imgConfidence = publicImage('2016-05/2016-4.jpg');

const imgFuding1 = publicImage('2017-Spring/2017-1.jpg');
const imgFuding2 = publicImage('2017-Spring/2017-2.jpg');
const imgFuding3 = publicImage('2017-Spring/2017-3.jpg');

const imgSichuan1 = publicImage('2017-Winter/2017-1.jpg');
const imgSichuan2 = publicImage('2017-Winter/2017-2.jpg');
const imgSichuan3 = publicImage('2017-Winter/2017-3.jpg');

const imgCampusDonation_1 = publicImage('2018-Spring/2018-1.jpg');
const imgCampusDonation_2 = publicImage('2018-Spring/2018-2.jpg');

const imgKangbao1 = publicImage('2018-Summer/2018-1.jpg');
const imgKangbao2 = publicImage('2018-Summer/2018-2.jpg');
const imgKangbao3 = publicImage('2018-Summer/2018-3.jpg');
const imgKangbao4 = publicImage('2018-Summer/2018-4.jpg');

const imgKangbaoMeet1 = publicImage('xiaokangbao/pic1.jpg');
const imgKangbaoMeet2 = publicImage('xiaokangbao/pic2.jpg');
const imgKangbaoSmile1 = publicImage('xiaokangbao/pic3.jpg');
const imgKangbaoSmile2 = publicImage('xiaokangbao/pic4.jpg');
const imgKangbaoChristmas1 = publicImage('xiaokangbao/pic5.jpg');
const imgKangbaoChristmas2 = publicImage('xiaokangbao/pic6.jpg');
const imgKangbaoThankYou1 = publicImage('xiaokangbao/pic7.jpg');
const imgKangbaoThankYou2 = publicImage('xiaokangbao/pic8.jpg');

const imgKspring1 = publicImage('2019-kangbao4/kspring1.jpg');
const imgKspring2 = publicImage('2019-kangbao4/kspring2.jpg');
const imgKspring3 = publicImage('2019-kangbao4/kspring3.jpg');
const imgKspring4 = publicImage('2019-kangbao4/kspring4.jpg');
const imgKspring5 = publicImage('2019-kangbao4/kspring5.jpg');
const imgKspring6 = publicImage('2019-kangbao4/kspring6.jpg');
const imgKspring7 = publicImage('2019-kangbao4/kspring7.jpg');

const imgKenya1 = publicImage('2019-Africa/africa1.jpg');
const imgKenya2 = publicImage('2019-Africa/africa2.jpg');
const imgKenya3 = publicImage('2019-Africa/africa3.jpg');
const imgKenya4 = publicImage('2019-Africa/africa4.jpg');

const imgKenya11 = publicImage('2019-Africa-2/africa1.jpg');
const imgKenya12 = publicImage('2019-Africa-2/africa2.jpg');
const imgKenya13 = publicImage('2019-Africa-2/africa3.jpg');
const imgKenya14 = publicImage('2019-Africa-2/africa4.jpg');
const imgKenya15 = publicImage('2019-Africa-2/africa5.jpg');

const imgKangbaoPart11 = publicImage('2019-kangbao/kangbao1.jpg');
const imgKangbaoPart12 = publicImage('2019-kangbao/kangbao2.jpg');
const imgKangbaoPart13 = publicImage('2019-kangbao/kangbao3.jpg');
const imgKangbaoPart14 = publicImage('2019-kangbao/kangbao4.jpg');
const imgKangbaoPart15 = publicImage('2019-kangbao/kangbao5.jpg');
const imgKangbaoPart16 = publicImage('2019-kangbao/kangbao6.jpg');
const imgKangbaoPart17 = publicImage('2019-kangbao/kangbao7.jpg');
const imgKangbaoPart18 = publicImage('2019-kangbao/kangbao8.jpg');

const imgSmile1 = publicImage('2019-smile/smile1.jpg');
const imgSmile2 = publicImage('2019-smile/smile2.jpg');
const imgSmile3 = publicImage('2019-smile/smile3.jpg');
const imgSmile4 = publicImage('2019-smile/smile4.jpg');
const imgSmile5 = publicImage('2019-smile/smile5.jpg');

const imgBack1 = publicImage('2020-back/back1.jpg');
const imgBack2 = publicImage('2020-back/back2.jpg');
const imgBack3 = publicImage('2020-back/back3.jpg');
const imgBack4 = publicImage('2020-back/back4.jpg');
const imgBack5 = publicImage('2020-back/back5.jpg');
const imgBack6 = publicImage('2020-back/back6.jpg');

const imgCovid1 = publicImage('2020-COVID/covid1.jpg');
const imgCovid2 = publicImage('2020-COVID/covid2.jpg');
const imgCovid3 = publicImage('2020-COVID/covid3.jpg');
const imgCovid4 = publicImage('2020-COVID/covid4.jpg');
const imgCovid5 = publicImage('2020-COVID/covid5.jpg');

const imgLonging1 = publicImage('2020-longing/longing1.jpg');
const imgLonging2 = publicImage('2020-longing/longing2.jpg');
const imgLonging3 = publicImage('2020-longing/longing3.jpg');

const imgPandemic1 = publicImage('2020-pandemic/pandemic1.jpg');
const imgPandemic2 = publicImage('2020-pandemic/pandemic2.jpg');
const imgPandemic3 = publicImage('2020-pandemic/pandemic3.jpg');

const imgPBIC1 = publicImage('2020-PBIC/pbic1.jpg');
const imgPBIC2 = publicImage('2020-PBIC/pbic2.jpg');
const imgPBIC3 = publicImage('2020-PBIC/pbic3.jpg');

const imgKangbao20201 = publicImage('2020-kangbao/kangbao1.jpg');
const imgKangbao20202 = publicImage('2020-kangbao/kangbao2.jpg');
const imgKangbao20203 = publicImage('2020-kangbao/kangbao3.jpg');
const imgKangbao20204 = publicImage('2020-kangbao/kangbao4.jpg');
const imgKangbao20205 = publicImage('2020-kangbao/kangbao5.jpg');
const imgKangbao20206 = publicImage('2020-kangbao/kangbao6.png');

const imgChampion1 = publicImage('2020-champions/champion1.jpg');
const imgChampion2 = publicImage('2020-champions/champion2.jpg');
const imgChampion3 = publicImage('2020-champions/champion3.jpg');
const imgChampion4 = publicImage('2020-champions/champion4.jpg');
const imgChampion5 = publicImage('2020-champions/champion5.jpg');

const imgClass1 = publicImage('2021-class/class1.jpg');
const imgClass2 = publicImage('2021-class/class2.png');
const imgClass3 = publicImage('2021-class/class3.jpg');
const imgClass4 = publicImage('2021-class/class4.jpg');

const imgLaba1 = publicImage('2021-Laba/action1.jpg');
const imgLaba2 = publicImage('2021-Laba/action2.jpg');
const imgLaba3 = publicImage('2021-Laba/action3.jpg');
const imgLaba4 = publicImage('2021-Laba/action4.jpg');

const imgMom1 = publicImage('2021-womenDay/mom1.jpg');
const imgMom2 = publicImage('2021-womenDay/mom2.jpg');

const imgDream1 = publicImage('2021-dream/dream1.jpg');
const imgDream2 = publicImage('2021-dream/dream2.jpg');
const imgDream3 = publicImage('2021-dream/dream3.jpg');
const imgDream4 = publicImage('2021-dream/dream4.png');
const imgDream5 = publicImage('2021-dream/dream5.png');
const imgDream6 = publicImage('2021-dream/dream6.png');
const imgDream7 = publicImage('2021-dream/dream7.png');

const imgCentennial1 = publicImage('2021-centennial/centennial1.png');
const imgCentennial2 = publicImage('2021-centennial/centennial2.png');
const imgCentennial3 = publicImage('2021-centennial/centennial3.png');

const imgKangbao20211 = publicImage('2021-kangbao/kangbao20211.jpg');
const imgKangbao20212 = publicImage('2021-kangbao/kangbao20212.jpg');
const imgKangbao20213 = publicImage('2021-kangbao/kangbao20213.jpg');
const imgKangbao20214 = publicImage('2021-kangbao/kangbao20214.jpg');
const imgKangbao20215 = publicImage('2021-kangbao/kangbao20215.jpg');

const imgReflection1 = publicImage('2022-reflection/reflection1.gif');

const imgGift1 = publicImage('2022-gift/gift1.jpg');
const imgGift2 = publicImage('2022-gift/gift2.jpg');

const imgDream20221 = publicImage('2022-dream/dream20221.jpg');
const imgDream20222 = publicImage('2022-dream/dream20222.jpg');
const imgDream20223 = publicImage('2022-dream/dream20223.jpg');

const imgGratitude1 = publicImage('2022-gratitude/gratitude1.jpg');
const imgGratitude2 = publicImage('2022-gratitude/gratitude2.jpg');

const imgSpring1 = publicImage('2023-spring/spring1.jpg');
const imgSpring2 = publicImage('2023-spring/spring2.jpg');
const imgSpring4 = publicImage('2023-spring/spring4.jpg');
const imgSpring5 = publicImage('2023-spring/spring5.jpg');
const imgSpring6 = publicImage('2023-spring/spring6.jpg');
const imgSpring7 = publicImage('2023-spring/spring7.jpg');
const imgSpring8 = publicImage('2023-spring/spring8.jpg');

const imgRole1 = publicImage('2023-rolemodel/role1.jpg');
const imgRole2 = publicImage('2023-rolemodel/role2.jpg');
const imgRole3 = publicImage('2023-rolemodel/role3.jpg');
const imgRole4 = publicImage('2023-rolemodel/role4.jpg');
const imgRole5 = publicImage('2023-rolemodel/role5.jpg');
const imgRole6 = publicImage('2023-rolemodel/role6.jpg');
const imgRole7 = publicImage('2023-rolemodel/role7.jpg');
const imgRole8 = publicImage('2023-rolemodel/role8.jpg');
const imgRole9 = publicImage('2023-rolemodel/role9.jpg');
const imgRole10 = publicImage('2023-rolemodel/role10.jpg');
const imgRole11 = publicImage('2023-rolemodel/role11.jpg');
const imgRole12 = publicImage('2023-rolemodel/role12.jpg');
const imgRole13 = publicImage('2023-rolemodel/role13.jpg');
const imgRole14 = publicImage('2023-rolemodel/role14.jpg');

const imgNews1 = publicImage('2023-goodnews/goodnews1.jpg');
const imgNews2 = publicImage('2023-goodnews/goodnews2.jpg');
const imgNews3 = publicImage('2023-goodnews/goodnews3.jpg');
const imgNews4 = publicImage('2023-goodnews/goodnews4.jpg');
const imgNews5 = publicImage('2023-goodnews/goodnews5.jpg');
const imgNews6 = publicImage('2023-goodnews/goodnews6.jpg');
const imgNews7 = publicImage('2023-goodnews/goodnews7.jpg');
const imgNews8 = publicImage('2023-goodnews/goodnews8.jpg');
const imgNews9 = publicImage('2023-goodnews/goodnews9.jpg');
const imgNews10 = publicImage('2023-goodnews/goodnews10.jpg');
const imgNews11 = publicImage('2023-goodnews/goodnews11.jpg');

const imgSpring20241 = publicImage('2024-spring/spring20241.png');
const imgSpring20242 = publicImage('2024-spring/spring20242.jpg');
const imgSpring20243 = publicImage('2024-spring/spring20243.jpg');
const imgSpring20244 = publicImage('2024-spring/spring20244.jpg');
const imgSpring20245 = publicImage('2024-spring/spring20245.jpg');
const imgSpring20246 = publicImage('2024-spring/spring20246.jpg');
const imgSpring20247 = publicImage('2024-spring/spring20247.jpg');
const imgSpring20248 = publicImage('2024-spring/spring20248.jpg');
const imgSpring20249 = publicImage('2024-spring/spring20249.jpg');
const imgSpring202410 = publicImage('2024-spring/spring202410.jpg');
const imgSpring202411 = publicImage('2024-spring/spring202411.jpg');
const imgSpring202412 = publicImage('2024-spring/spring202412.jpg');

const imgKangbao20241 = publicImage('2024-kangbao/kangbao20241.jpg');
const imgKangbao20242 = publicImage('2024-kangbao/kangbao20242.jpg');
const imgKangbao20243 = publicImage('2024-kangbao/kangbao20243.jpg');
const imgKangbao20244 = publicImage('2024-kangbao/kangbao20244.jpg');
const imgKangbao20245 = publicImage('2024-kangbao/kangbao20245.jpg');
const imgKangbao20246 = publicImage('2024-kangbao/kangbao20246.jpg');
const imgKangbao20247 = publicImage('2024-kangbao/kangbao20247.jpg');
const imgKangbao20248 = publicImage('2024-kangbao/kangbao20248.jpg');
const imgKangbao20249 = publicImage('2024-kangbao/kangbao20249.jpg');
const imgKangbao202410 = publicImage('2024-kangbao/kangbao202410.jpg');
const imgKangbao202411 = publicImage('2024-kangbao/kangbao202411.jpg');
const imgKangbao202412 = publicImage('2024-kangbao/kangbao202412.png');
const imgKangbao202413 = publicImage('2024-kangbao/kangbao202413.png');

const imgDecade1 = publicImage('2025-decade/decade1.jpg');
const imgDecade2 = publicImage('2025-decade/decade2.jpg');
const imgDecade3 = publicImage('2025-decade/decade3.jpg');
const imgDecade4 = publicImage('2025-decade/decade4.jpg');

const imgLighting1 = publicImage('2025-lighting/lighting1.jpg');
const imgLighting2 = publicImage('2025-lighting/lighting2.jpg');
const imgLighting3 = publicImage('2025-lighting/lighting3.png');
const imgLighting4 = publicImage('2025-lighting/lighting4.png');
const imgLighting5 = publicImage('2025-lighting/lighting5.png');

const defaultData = [
	{
		year: 2016,
		title: 'Planting the First Seed',
		summary: 'Getting started no matter what challenges arise.',
		events: [
			{
				id: '2016-05-first-park-event',
				title: '2016-05 First Park Book Donation Event',
				detailBlocks: [
					{ type: 'subtitle', content: 'Taking the First Step' },
					{
						type: 'text',
						content:
							'On May 1, 2016, Little Green Leaves held its first official event. I still remember how nervous we were during our first donation activity at the park — we didn’t dare lift our heads, worried that no one would donate, no one would approach, and unsure how to introduce ourselves. Most of all, we felt embarrassed and hesitant. Thankfully, with parents encouraging us from behind and teammates cheering one another on, we slowly gathered courage. The first step is always the hardest, but once we took it, we realized it wasn’t as scary as we imagined.',
					},
					{
						type: 'image',
						src: imgBookDonationEvent,
						alt: 'Park book donation event',
						caption: "Little Green Leaves' first park book donation event.",
					},
					{
						type: 'text',
						content:
							'As time went on, I became more confident, my explanations became clearer and more concise, and gradually, we began seeing wonderful results.',
					},
					{ type: 'subtitle', content: 'Growing Recognition' },
					{
						type: 'text',
						content:
							'Because of this event, more people learned about Little Green Leaves. Our first-grade homeroom teacher personally donated 509 brand-new books and delivered them to our site. Kindergarten teachers brought books directly to our homes. Teachers from grades 1 to 6 encouraged their students to participate, and a fifth-grade teacher even created a full classroom presentation to introduce our volunteer efforts to her students.',
					},
					{
						type: 'image',
						src: imgGrowRecognition,
						alt: 'Growing recognition',
						caption: 'Growing recognition for Little Green Leaves.',
					},
					{ type: 'subtitle', content: 'Lessons Beyond the Classroom' },
					{
						type: 'text',
						content:
							'This offline event gave every member experiences that no classroom or textbook could offer. We began with nervousness, shyness, and self-doubt — yet were met with support, trust, and encouragement from the community. From being too scared to speak, to introducing our mission with confidence, every moment became a memory we will never forget.',
					},
					{
						type: 'image',
						src: imgLessonsBeyondClassroom,
						alt: 'Lessons beyond the classroom',
						caption: 'Everyone learned lessons beyond the classroom.',
					},
					{
						type: 'text',
						content:
							'Across just two days, we collected more than 1,000 donated books. Although everyone felt tired, we also experienced the joy of teamwork, the fulfillment of giving, and the true happiness that comes from helping others — an invaluable treasure.',
					},
					{ type: 'subtitle', content: 'A Boost of Confidence' },
					{
						type: 'text',
						content:
							'This very first event gave us a huge boost of confidence. We are deeply grateful to the parents who encouraged us, the teachers who supported us, and every kind-hearted donor who believed in us. Their trust helped us understand that what we were doing truly mattered.',
					},
					{
						type: 'text',
						content:
							'Little Green Leaves will continue working hard to be a bridge of love — to spread kindness, warmth, and hope wherever we go.',
					},
					{
						type: 'image',
						src: imgConfidence,
						alt: 'A boost of confidence',
						caption: 'A boost of confidence for Little Green Leaves.',
					},
				],
			},
			{
				id: '2016-08',
				title: '2016-08 Fundraising and Book Donation',

				detailBlocks: [
					{ type: 'subtitle', content: 'Background & Preparation' },
					{
						type: 'text',
						content:
							'During the summer of 2016, as the holiday was coming to an end, “Little Green Leaves” (小绿叶志愿者平台) was introduced by the founder’s mother to a local educational charity called “Lotus Educational Assistance” (莲花助学) in Henan Province.',
					},
					{
						type: 'image',
						src: imgBookshelf,
						alt: 'The books on the shelf',
						caption: 'Books labeled and ready to be shipped.',
					},
					{
						type: 'text',
						content:
							'Through the help of Teacher Maomao Xiong, the group learned that Yuezhuang Primary School in Xiatang Town, Lushan County, needed books. The members immediately began sorting and organizing the books collected over the summer.',
					},
					{
						type: 'image',
						src: imgPacked,
						alt: 'Packed bookshelves',
						caption: 'Labeled for shipment. Time to go!',
					},
					{
						type: 'text',
						content:
							'Nearly 4,000 books and 10 bookshelves (all purchased with New Year’s money) were prepared and ready to ship.',
					},
					{ type: 'subtitle', content: 'Overcoming Challenges' },
					{
						type: 'text',
						content:
							'However, shipping became a problem — the books were heavy, the distance long, and the postage expensive. Since every cost came from the children’s own savings, Little Green Leaves (with a parent accompanying) visited every courier service in town to compare prices.',
					},
					{
						type: 'text',
						content:
							'Finally, SF Express and Deppon Express were chosen as options. When the SF Express manager heard about their charitable mission, he immediately offered a 40% discount on shipping.',
					},
					{
						type: 'image',
						src: imgShippment,
						alt: 'Books loaded on truck',
						caption: 'Books loaded and ready for shipment.',
					},
					{
						type: 'text',
						content:
							'The kids were thrilled — and soon, the second batch of books and bookshelves set out on their journey filled with love and care. 📦💚',
					},
					{ type: 'subtitle', content: 'Journey to the Mountains' },
					{
						type: 'text',
						content:
							'On August 15, 2016, accompanied by their family, Little Green Leaves drove over 1,000 kilometers, traveling more than ten hours into the mountain region to personally deliver the books to the village school.',
					},
					{
						type: 'image',
						src: imgArrival,
						alt: 'Arrived at village school',
						caption: 'Little Green Leaves arrived at village school.',
					},
					{
						type: 'text',
						content:
							'Upon arrival, they were warmly greeted by the principal and teachers, whose enthusiasm and kindness washed away all the fatigue from the journey. 😊',
					},
					{
						type: 'text',
						content:
							'Although the students were on summer vacation (so they didn’t meet them in person), seeing all the book boxes arrive safely brought deep joy and fulfillment.',
					},
					{
						type: 'image',
						src: imgBooksReady,
						alt: 'Books ready and sorted at village school',
						caption: 'Books ready and sorted at village school.',
					},
					{
						type: 'text',
						content:
							'The teachers explained that many of their students lived far away and had to stay in the dormitory, which was largely supported by donations. The school’s old library only had one small bookshelf with a few torn books — so these new donations arrived just in time.',
					},
					{
						type: 'image',
						src: imgBookCorner,
						alt: 'Book corner in the classroom',
						caption: 'A cozy book corner set up for the students.',
					},
					{
						type: 'text',
						content: '📚 Now, the children could finally read freely and explore new worlds through books.',
					},
					{ type: 'subtitle', content: '' },
					{
						type: 'text',
						content:
							'After leaving the school, the group continued deeper into the mountains to visit students their family had personally sponsored for years.',
					},
					{
						type: 'text',
						content:
							'They met:\n\n- A boy recently admitted to Zhengzhou University\n\n- A younger girl in elementary school\n\n- And two high school senior sisters, whom they later visited at Lushan No. 1 High School',
					},
					{
						type: 'image',
						src: imgHomeVisit,
						alt: 'Little Green Leaves visiting a sponsored student at home',
						caption: 'Visiting a sponsored student at home.',
					},
					{
						type: 'text',
						content:
							'At the high school, they met the sisters under the guidance of the head teacher and learned about their studies and daily lives. They encouraged the girls to keep working hard and to pursue their dreams.',
					},
					{
						type: 'image',
						src: imgSchoolVisit,
						alt: 'Little Green Leaves visiting a sponsored student at school',
						caption: 'Visiting a sponsored student at school.',
					},
					{
						type: 'text',
						content:
							'Even with few words, it was clear that the students were full of gratitude and determination — they knew that through effort, they could repay the kindness they had received.\n✨ Both girls were later admitted to their dream universities in 2017.',
					},
					{ type: 'subtitle', content: 'Reflections' },
					{
						type: 'text',
						content: 'The Little Green Leaves group deeply thanked Teacher Maomao Xiong for this opportunity.',
					},
					{
						type: 'text',
						content:
							'This trip to Lushan made them realize how fortunate they were — with access to good education and living conditions. They promised to cherish what they have, to keep doing their best, and to help more people in need in the future. 🌿❤️',
					},
				],
			},
			{
				id: '2016-07-summer-donation',
				title: '2016-07 Summer Book Donation Campaign',
				detailBlocks: [
					{ type: 'subtitle', content: 'Getting Started' },
					{
						type: 'text',
						content:
							'During the summer of 2016, as vacation began, the Little Green Leaves volunteer team set an ambitious goal: to organize a large-scale community book donation campaign. With careful planning, we scheduled all activities for after 5 p.m. to avoid the heat while ensuring we could carry out our tasks efficiently. Our thoughtful preparation earned support and encouragement from our teachers.',
					},
					{
						type: 'text',
						content:
							'On the very first day, classmates arrived early at the donation site, filled with excitement. Everyone followed their assigned roles—some hung banners, some took notes, and others used loudspeakers to promote the event. Gone was the nervousness from our very first attempt; this time, everyone worked confidently and smoothly.',
					},
					{
						type: 'image',
						src: imgGather,
						alt: 'Donation event gathering',
						caption: 'Classmates arrived early at the donation site.',
					},
					{ type: 'subtitle', content: 'Engaging the Community' },
					{
						type: 'text',
						content:
							'Soon, people began stopping to watch, ask questions, and scan our donation QR code. Fueled by confidence, we seized every chance to share our mission—approaching elderly walkers, playful children, couples on evening strolls, taxi drivers, and even police officers. Although we sometimes encountered rejection or unkind responses, none of us gave up. We always responded with polite bows and sincere gratitude.',
					},
					{
						type: 'text',
						content:
							'We believed deeply in the meaning of what we were doing. Even if some didn’t understand us yet, we knew we simply needed to keep trying. Every difficult moment strengthened us and taught us courage.',
					},
					{
						type: 'text',
						content:
							'Gradually, more and more people recognized “Little Green Leaves.” Donations increased—from a few books to dozens. As we saw results, our once awkward introduction speech became much more fluent and confident.',
					},
					{
						type: 'image',
						src: imgCommunityEngagement,
						alt: 'Donation event community engagement',
						caption: 'Engaging with the community during the donation event.',
					},
					{ type: 'subtitle', content: 'Moments That Touched Our Hearts' },
					{
						type: 'text',
						content:
							'Many touching scenes remain unforgettable: someone who had just bought a new book at the store immediately donated it after hearing our mission; students who rushed over between classes to deliver books; people who hurried to us despite approaching rain; families who brought books in bags; and even those who delivered them by car. We were surrounded by kindness.',
					},
					{
						type: 'text',
						content:
							'We responded with heartfelt smiles, sincere bows, and genuine gratitude. Every effort felt worthwhile because every donation carried love.',
					},
					{
						type: 'image',
						src: imgMoments,
						alt: 'Donation event moments that touched our hearts',
						caption: 'Moments that touched our hearts during the donation event.',
					},
					{ type: 'subtitle', content: 'Support From Our Teacher' },
					{
						type: 'text',
						content:
							'On the third day, we received an unexpected surprise—our homeroom teacher, Mr. Zhang, came personally to support us, giving us encouragement and strength. He even joined us on the frontline, introducing our project to passersby. A moved bystander offered to take photos, capturing this unforgettable moment.',
					},
					{
						type: 'image',
						src: imgSupport,
						alt: 'Donation event support from our teacher',
						caption: 'Support from our teacher during the donation event.',
					},
					{
						type: 'text',
						content:
							'By the end of the first three days, we had collected more than 800 books. To prepare for the next stage, we paused briefly to rest and strategize.',
					},

					{ type: 'subtitle', content: 'Becoming More Professional' },
					{
						type: 'image',
						src: imgProfessional,
						alt: 'Donation event becoming more professional',
						caption: 'Becoming more professional during the donation event.',
					},
					{
						type: 'text',
						content:
							'In later events, we became noticeably more professional—our mother even helped us customize T-shirts printed with the “Little Green Leaves” logo. Wearing matching uniforms attracted more attention and made people more willing to approach and learn about our project.',
					},
					{ type: 'subtitle', content: 'Results & Impact' },
					{
						type: 'text',
						content:
							'Over the course of the summer, we held 7 events and collected more than 3,000 books on-site. Another 700 books were donated afterward, and over 1,000 were mailed from around the country thanks to our online outreach. In total, we received more than 5,000 books in just one month.',
					},
					{
						type: 'text',
						content:
							'Beyond the books themselves, this experience taught us the courage to challenge ourselves and persevere through difficulties. We discovered that when we help others, we grow the most ourselves—truly experiencing the “action and reaction” of kindness.',
					},
					{ type: 'subtitle', content: 'Gratitude' },
					{
						type: 'text',
						content:
							'We are sincerely grateful. Every act of generosity, every word of encouragement, and every helping hand helped “Little Green Leaves” grow stronger. Because of everyone’s support, we were able to achieve far more than we ever imagined.',
					},
				],
			},
		],
		icon: HandCoins,
	},
	{
		year: 2017,
		title: 'Roots in the Soil',
		summary: 'Expanding, connecting, and working with passion and love.',
		events: [
			{
				id: '2017-fuding-community-donation',
				title: '2017-Spring Fuding Community Donation Event',
				detailBlocks: [
					{ type: 'subtitle', content: 'Community Collaboration & Outreach' },
					{
						type: 'text',
						content:
							'In 2017, members of the Little Green Leaves Alliance not only organized donation events together but also carried out independent outreach at their own schools. Some even visited the residential communities where they lived, asking neighborhood staff and property management to help spread the word — and the results were remarkable.',
					},
					{
						type: 'image',
						src: imgFuding1,
						alt: 'Community donation event',
						caption: 'Fuding community donation activity.',
					},

					{ type: 'subtitle', content: 'Warmth in Fuding Community' },
					{
						type: 'text',
						content:
							'In the spring of 2017, Little Green Leaves and two alliance members visited the Fuding Manor Community in Sanhe City. The uncles and aunties there greeted us warmly. They not only brought books from their own homes but also helped us collect donations throughout the community.',
					},
					{
						type: 'text',
						content:
							'What moved us the most was that the caring aunties from the Fuding Manor Residents’ Committee contacted the Municipal Association for Science and Technology. Together, they donated several hundred brand-new science books! It felt like a burst of energy — a powerful boost that inspired us as we began a new year of volunteer work.',
					},
					{ type: 'image', src: imgFuding2, alt: 'Book donation', caption: 'Residents donating books.' },

					{ type: 'subtitle', content: 'Heartfelt Gratitude' },
					{
						type: 'text',
						content:
							'Little Green Leaves would like to once again express our sincere gratitude to the kindhearted aunties of the Fuding Manor Residents’ Committee and the leaders of the Municipal Association for Science and Technology. Their support strengthened our confidence and motivated us to keep moving forward.',
					},
					{
						type: 'image',
						src: imgFuding3,
						alt: 'Group photo',
						caption: 'Little Green Leaves saying thank you to the community members.',
					},
					{
						type: 'text',
						content:
							'We believe that as we continue working hard, a single green leaf can grow into a forest — no longer just a dream, but a future we are building step by step. Little Green Leaves is always on the road, spreading love and light wherever we go.',
					},
				],
			},

			{
				id: '2017-sichuan-donation',
				title: '2017-Winter Sichuan Donation Campaign',
				detailBlocks: [
					{ type: 'subtitle', content: 'Online Efforts, Continuous Growth' },
					{
						type: 'text',
						content:
							'Although offline activities provided direct communication and valuable hands-on experience, online outreach played an equally important role in the growth of Little Green Leaves. In 2017, because I was preparing to study abroad, most of my summer was spent on standardized tests, essays, and application materials. I had almost no time to organize offline events. However, we never stopped moving forward. We continuously posted updates and donation requests on WeChat and QQ, and the response was overwhelming — caring people from all over the country mailed books to us from every direction.',
					},

					{
						type: 'image',
						src: imgSichuan1,
						alt: 'Donated books arriving',
						caption: 'Books mailed from all over China.',
					},

					{ type: 'subtitle', content: 'Support for Orphans in Sichuan' },
					{
						type: 'text',
						content:
							'At the end of 2017, we learned that Qianfoshi (Thousand Buddha Temple) in Zigong, Sichuan, was home to dozens of orphans in need of books. I immediately reached out to Uncle Sun Yan from SF Express. To my surprise, he rushed over without even eating lunch to check whether we needed help organizing and packing the books. When he arrived, he helped us sort, box, and prepare everything for shipment.',
					},
					{
						type: 'text',
						content:
							'Even more touching, he told us that Little Green Leaves no longer needed to pack shipments ourselves — whenever we needed to send love-filled books, he would arrange for the company’s staff to help with sorting and boxing. He also promised that this shipment would be delivered entirely free of charge.',
					},
					{
						type: 'text',
						content:
							'We were deeply moved. How could a small child like me deserve so much kindness and support? The truth is simple: people help because they carry goodness in their hearts. They saw meaning in what we were doing, and that is why they offered their help selflessly. Little Green Leaves will continue to work hard to pass on this warmth.',
					},

					{
						type: 'image',
						src: imgSichuan2,
						alt: 'Packing books for Sichuan',
						caption: 'Packing the Sichuan shipment with care.',
					},

					{ type: 'subtitle', content: 'A Shipment Full of Love' },
					{
						type: 'text',
						content:
							'The third shipment — 2,000 donated books and more than 500 notebooks — set off carrying love, warmth, and blessings. Each box represented the kindness of countless people and the hope that these children would feel cared for and supported.',
					},
					{
						type: 'image',
						src: imgSichuan3,
						alt: 'SF Express helping pack',
						caption: 'SF Express staff assisting with packing.',
					},
				],
			},
		],
		icon: HeartHandshake,
	},
	{
		year: 2018,
		title: 'First Leaves',
		summary: 'Making a meaningful impact through focused efforts.',
		events: [
			{
				id: '2018-graduation-campus-donation',
				title: '2018-Spring Graduation Donation Event at Our Alma Mater',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Meaningful Final Year' },
					{
						type: 'text',
						content:
							'For me, 2018 was marked by two major milestones: applying to U.S. high schools and preparing for the high school entrance exam. In March, I received an offer from my dream school. After that, I devoted myself fully to studying. Time was incredibly precious — yet our class committee made a bold decision: to organize a one-week book donation drive during lunchtime, just 20 minutes each day, right at the school gate.',
					},
					{
						type: 'text',
						content:
							'With so many students passing by every day, you can imagine the variety of looks and reactions… We faced curious stares with smiles, explained patiently despite misunderstandings, supported each other through moments of doubt or teasing, and embraced every bit of encouragement and participation that came our way. We were truly grateful for everyone who walked this path with us.',
					},
					{
						type: 'image',
						src: imgCampusDonation_1,
						alt: 'Students collecting books',
						caption: 'Book donation setup at the school gate.',
					},

					{ type: 'subtitle', content: '100 Minutes of Youth, a Lifetime of Memory' },
					{
						type: 'text',
						content:
							'Five days — 100 minutes in total. For us, every minute was extremely valuable. Yet in the long river of life, these 100 minutes may seem small and fleeting. Still, I believe every student who joined the donation drive gained an experience they had never had before.',
					},
					{
						type: 'text',
						content:
							'Who says we teenagers are rebellious? These books are the warm currents beneath that so-called rebellion. Who says we lack compassion? These donations are our blessings as young people. Who says we don’t understand gratitude? These books carry the care and kindness we want to pass on to younger students.',
					},

					{
						type: 'image',
						src: imgCampusDonation_2,
						alt: 'Students organizing books',
						caption: 'Organizing donated books together.',
					},

					{ type: 'subtitle', content: 'A Bright Mark on Our Graduation Year' },
					{
						type: 'text',
						content:
							'These 100 minutes added a brilliant stroke of color to our graduation album — and painted a bold, unforgettable page in the story of our youth. This brief project became one of the most meaningful memories of our final year.',
					},
				],
			},

			{
				id: '2018-kangbao-donation',
				title: '2018-Summer Kangbao Donation Trip',
				detailBlocks: [
					{ type: 'subtitle', content: 'New Journey, New Partners' },
					{
						type: 'text',
						content:
							'When summer vacation began, Little Green Leaves finally had time to sort the books, categorize them, and pack boxes to deliver the existing donations to schools in need. By chance, we met Uncle Zhao from the “Century Pear Garden Charity Group.” He kindly connected us with Ms. Zhong Lixiang, the manager of Pacific Insurance in Kangbao County. She warmly helped us reach two primary schools in Zhangjiakou Kangbao County — and soon, our love-filled books and 10 bookshelves were ready to set off!',
					},

					{
						type: 'image',
						src: imgKangbao1,
						alt: 'Books packed for Kangbao',
						caption: 'Preparing books and shelves for shipment.',
					},

					{ type: 'subtitle', content: 'Arriving in Kangbao' },
					{
						type: 'text',
						content:
							'On June 11th, accompanied by Uncle Zhao and his family from the Century Pear Garden Charity Group, Little Green Leaves arrived at Dengyoufang Primary School in Kangbao County. Leaders from the county, the education bureau, and the township attended and showed great support for our visit.',
					},
					{
						type: 'text',
						content:
							'Little Green Leaves shared our growth and journey from the past two years, receiving warm applause from all the teachers and students, as well as affirmation and encouragement from the leaders. Seeing their newly arranged library and the joyful smiles on the children’s faces made every effort of the past two years feel absolutely worthwhile.',
					},

					{
						type: 'image',
						src: imgKangbao2,
						alt: 'Students receiving books',
						caption: 'A joyful moment at Dengyoufang Primary School.',
					},

					{ type: 'subtitle', content: 'Reflections on the Journey Back' },
					{
						type: 'text',
						content:
							'On the way home from Kangbao, I quietly recalled everything. Two years ago, all of this began simply because I gave a few books to a shy little boy — and his joyful expression touched my heart. Today, we have helped five village primary schools. Seeing so many children holding books with excitement, hearing their sincere words of thanks, and watching their eyes light up as they shared their thoughts — these moments are etched into my memory. They continue to motivate me and remind Little Green Leaves that we are always walking on the road of our dreams.',
					},
					{
						type: 'image',
						src: imgKangbao3,
						alt: 'Classroom library setup',
						caption: 'A new reading corner ready for the children.',
					},

					{ type: 'subtitle', content: 'A New Beginning — The Official WeChat Account' },
					{
						type: 'text',
						content:
							'On January 1st, 2019 — the first day of the New Year — Little Green Leaves launched its official WeChat public account. This marked a fresh start from the heart, allowing us to continue spreading warmth and gratitude as we reflected on three years of growth. We also launched the “Little Overseas Students Sending Warmth” donation campaign for clothes and books, inviting everyone to join us in helping more people.',
					},
					{
						type: 'text',
						content: 'Little Green Leaves growing into a forest — thank you for being part of this journey.',
					},
					{
						type: 'image',
						src: imgKangbao4,
						alt: 'Wechat account profile',
						caption: 'The profile page for Little Green Leaves official WeChat account.',
					},
				],
			},
			{
				id: '2018-kangbao-xiaokangbao',
				title: 'Your Smile Is My Motivation — Supporting Little Kangbao',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Fate We Never Expected' },
					{
						type: 'text',
						content:
							'In June 2018, after completing the Kangbao County book donation event, I thought our connection with the region had reached a beautiful ending. Instead, it turned out to be just the beginning. As we were preparing to leave, the town leaders mentioned that there was a five-year-old boy in need of long-term support. His name was Li Kang.',
					},
					{
						type: 'text',
						content:
							'Through the introduction of Mayor Liu Yanfeng of Kangbao Town, we learned that little Li Kang lived in Daoyin Village. His father had passed away in a car accident, and his mother had remarried. He lived with his elderly grandparents, both struggling with health issues. It felt like destiny — a profound and unexpected connection linking Little Green Leaves with this little boy.',
					},
					{
						type: 'text',
						content:
							'Together with Uncle Zhao from the Century Pear Garden Charity Group, we went straight to his kindergarten to meet him. The moment I saw this quiet, shy child, I made a bold decision: to accompany him as he grows, and to let our lives become part of each other’s story.',
					},

					{
						type: 'image',
						src: imgKangbaoMeet1,
						alt: 'First meeting with Li Kang',
						caption: 'Our first time meeting with Little Kangbao.',
					},

					{ type: 'subtitle', content: 'First Meeting — A Bond Begins' },
					{
						type: 'text',
						content:
							'You probably would’ve never imagined that the aunt hugging you so tightly that day would become your new mother — and the big boy crouching beside you would become your future brother!',
					},
					{
						type: 'image',
						src: imgKangbaoMeet2,
						alt: 'Shy first meeting',
						caption: 'A shy beginning to a lifelong bond.',
					},

					{
						type: 'text',
						content:
							'Slowly, you began to relax. Your shy smile widened, revealing your tiny tiger teeth. You no longer resisted my hugs. When I picked you up and lifted you toward the sky, you laughed loudly like a little eagle spreading its wings for the first time. That moment melted my heart.',
					},
					{
						type: 'text',
						content:
							'Our time together was short, but something inside me shifted. Perhaps this feeling is what people call a “bond.” The moment you smiled, time seemed to freeze. I silently promised myself to guard that innocence and to grow alongside you.',
					},

					{ type: 'subtitle', content: 'Second Visit — A Birthday to Remember' },
					{
						type: 'text',
						content:
							'Before I left for school, I couldn’t stop thinking about you. When I returned, we celebrated your birthday together. You hid shyly in the corner when we arrived, but the moment you recognized me, your eyes lit up — you hadn’t forgotten me.',
					},
					{
						type: 'text',
						content:
							'I brought you a puzzle I used to play with as a kid. You grabbed it curiously and tried to piece it together before even listening to the instructions. You couldn’t solve it at first, but after I patiently explained, you proudly completed your very first puzzle. Your beaming smile was sweeter than honey.',
					},
					{
						type: 'image',
						src: imgKangbaoSmile1,
						alt: 'Kangbao smiling',
						caption: 'The smile that started it all.',
					},

					{
						type: 'text',
						content:
							'When I heard your birthday was just a few days away, I immediately prepared a surprise. Seeing you dressed in brand-new clothes, glowing with joy, I suddenly felt the urge to take care of you — something I had never experienced before.',
					},
					{
						type: 'image',
						src: imgKangbaoSmile2,
						alt: 'Kangbao smiling',
						caption: "We were having a good time for Kangbao's birthday.",
					},

					{ type: 'subtitle', content: 'Third Visit — Winter Reunion Across the Ocean' },
					{
						type: 'text',
						content:
							'Four months passed. Even though I was studying abroad, the cold winter could not stop my steps. The moment I returned to China, I rushed to see you.',
					},
					{
						type: 'text',
						content:
							'I had grown thinner — but you had grown even cuter. The moment I stepped out of the car, you ran toward me, shouting “Gege!” (“Big brother!”). My heart melted instantly.',
					},
					{
						type: 'text',
						content:
							'I gave you your first Christmas gift: a remote-control airplane. Your face lit up with disbelief and pure joy. Then came a huge box of building blocks — you were so excited you didn’t even notice you weren’t wearing shoes. You dumped the blocks onto the bed, laughing non-stop, showing me every little figurine you found.',
					},
					{
						type: 'image',
						src: imgKangbaoChristmas1,
						alt: 'Kangbao playing with building blocks',
						caption: 'Building blocks and endless laughter.',
					},
					{
						type: 'text',
						content:
							'You played with full concentration — so focused and adorable that I couldn’t help but stare. When you showed me your “masterpiece,” I clapped proudly. You truly had creativity!',
					},
					{
						type: 'text',
						content:
							'Later, I gave you dozens of storybooks I had read growing up. Even though you couldn’t understand English yet, you insisted I read the English comic books aloud to you. We built Lego, read stories, played games — every moment with you felt precious.',
					},
					{
						type: 'text',
						content:
							'At dinner, surrounded by your loving grandparents, aunt, and your new family, you refused to eat vegetables — until everyone praised you, and then you surprisingly finished a whole bowl of them! You made everyone laugh until their stomachs hurt.',
					},
					{
						type: 'image',
						src: imgKangbaoChristmas2,
						alt: 'Kangbao playing with building blocks',
						caption: 'Building blocks and endless laughter.',
					},
					{
						type: 'text',
						content:
							'But time always passes too quickly. When we stood up to leave, your eyes filled with tears. “When will you come back again?” you asked softly. Mom comforted you: “哥哥 will visit during his next break.” Only then did you let us go.',
					},

					{ type: 'subtitle', content: 'One Year Later — A Big Surprise' },
					{
						type: 'text',
						content:
							'A year after our first meeting, I returned again — the first stop of my summer vacation. Blue skies, white clouds, music, and the familiar roads accompanied me. When I arrived at your home, you jumped off the electric scooter and ran toward me shouting “哥哥！” with even more excitement than before.',
					},
					{
						type: 'text',
						content:
							'You proudly carried your new backpack and wouldn’t let go of it. When I brought out new clothes, your eyes widened with excitement. You carefully picked your own outfits — coordinating colors like a little fashion expert.',
					},

					{
						type: 'text',
						content:
							"When you stood on the kang bed and appeared taller than me, I pinched your chubby cheeks — and you burst into uncontrollable laughter. You led me outside to show me how you could salute, how you could read new characters, and how you could run faster than before. You weren't the quiet little boy from last year anymore — you had grown confident, cheerful, and lively.",
					},
					{
						type: 'text',
						content:
							'Seeing your clothes go from size 120 to 130, watching you volunteer to help carry my bags, noticing how you now spoke bravely and smiled often… I could clearly see your growth over these 11 months.',
					},

					{ type: 'subtitle', content: 'A Promise for Life' },
					{
						type: 'text',
						content:
							'Every visit, I leave you with a photo of the two of us — a small way to record our bond and your growth. And every time we say goodbye, I’m reminded of the promise we made:',
					},
					{
						type: 'image',
						src: imgKangbaoThankYou1,
						alt: 'Kangbao saying thank you',
						caption: 'A heartfelt thank you from Kangbao.',
					},
					{
						type: 'text',
						content:
							'“哥哥 will work hard in other countries in the world.  You will grow up healthy at home.  And together — we will both do our best.”',
					},
					{
						type: 'image',
						src: imgKangbaoThankYou2,
						alt: 'Kangbao saying thank you',
						caption: 'A heartfelt thank you from Kangbao.',
					},
					{
						type: 'text',
						content:
							'Your smile is the source of my strength. Thank you for letting me be part of your life. Thank you for giving Little Green Leaves a deeper meaning.',
					},
				],
			},
		],
		icon: Droplets,
	},
	{
		year: 2019,
		title: 'Canopy of Care',
		summary: 'Caring and loving, more than just books.',
		events: [
			{
				id: '2019-kangbao-fourth-visit',
				title: '2019-summer kangbao-fourth-visit',
				detailBlocks: [
					{ type: 'subtitle', content: 'Returning After One Year' },
					{
						type: 'text',
						content:
							'One year later, I returned for the fourth time. Walking into this place that felt both familiar and new, I noticed changes everywhere — cleaner streets, a more beautiful environment, more high-rise buildings, blue skies, white clouds, and a refreshing, gentle breeze. As I traveled through the town, I couldn’t help but reflect on how much he — and this place — had grown.',
					},

					{
						type: 'text',
						content:
							'We arrived in the evening. Despite the four-hour drive, Little Green Leaves felt no exhaustion at all — we came carrying flowers and gratitude. Ms. Liang Jingjing, Chairwoman of the Kangbao County Women’s Federation, was still waiting to welcome us warmly. I shared the growth journey of Little Green Leaves and learned in detail about the situation of left-behind children in the county.',
					},
					{ type: 'image', src: imgKspring1, alt: 'Kangbao town view' },

					{ type: 'subtitle', content: 'Love Helps Growth — No Child Left Alone' },
					{
						type: 'text',
						content:
							'This visit was part of the Kangbao County Women’s Federation’s third round of the program “Love Helps Growth, No Child Left Alone,” which focuses on pairing and supporting left-behind children. Despite his busy schedule, County Mayor Li personally attended the event, listened carefully to the introductions from the “loving families,” and learned about the origin and development of Little Green Leaves. He expressed strong affirmation and encouragement.',
					},
					{ type: 'image', src: imgKspring3, alt: 'Kangbao event photo' },
					{
						type: 'text',
						content:
							'During the event, I was also honored to meet Ms. Fan Weihua, Chairwoman of Zhangjiakou Zhangheng Big Sister Domestic Services Co., Ltd., and Ms. Zhang Jing, Chairwoman of Hebei Hengtai Leather Goods Co., Ltd. Listening to their stories of helping children in need deeply moved me. I sincerely applaud these two compassionate leaders for their generosity and dedication.',
					},
					{ type: 'image', src: imgKspring2, alt: 'Kangbao event photo' },
					{ type: 'subtitle', content: 'Standing Beneath the Flag' },
					{
						type: 'text',
						content:
							'When I once again put on the red Young Pioneer scarf and watched the national flag rise slowly in the hands of the students, I felt deeply moved. My love for this country is not only rooted in family, food, and beautiful scenery — but also in the pride that comes from its strength. Behind us stands a powerful nation we can rely on, giving us confidence and peace of mind. I believe every international student shares this same feeling.',
					},
					{ type: 'image', src: imgKspring4, alt: 'Raising the flag' },
					{
						type: 'text',
						content:
							'Little Green Leaves shared its own growth story with the students and spoke to them about the power of dreams. I hope every child can discover their own dream — and let it become the driving force that pushes them forward.',
					},
					{ type: 'image', src: imgKspring5, alt: 'Kangbao students' },

					{ type: 'subtitle', content: 'A Meaningful Beginning' },
					{
						type: 'text',
						content:
							'I sincerely invited Chairwoman Liang to serve as an “Ambassador of Love” for the Little Green Leaves Volunteer Alliance. She happily accepted. This was the very first invitation we have ever extended — and we believe it marks a beautiful beginning.',
					},
					{ type: 'image', src: imgKspring6, alt: 'Ambassador of Love invitation' },

					{ type: 'subtitle', content: 'Beyond Books — What Children Truly Need' },
					{
						type: 'text',
						content:
							'This program connected Little Green Leaves with 21 students from Beiguan Primary School in Kangbao County. Some were orphans; some were “quasi-orphans” with one parent absent; others came from impoverished families where parents had left home to work elsewhere. Little Green Leaves not only delivered blessings but also prepared beautiful new backpacks for each child.',
					},
					{
						type: 'text',
						content:
							'Standing among them, feeling their emotions and unspoken needs, I realized something more clearly than ever before: beyond books and clothing, what these children need most is companionship and emotional care. This experience helped me define a clearer direction and purpose.',
					},
					{
						type: 'text',
						content:
							'From this day forward, Little Green Leaves believes these children are no longer alone. The backpacks they carry hold not only books and knowledge, but also warmth, love, and the power of dreams.',
					},
					{ type: 'image', src: imgKspring7, alt: 'Children with backpacks' },

					{ type: 'subtitle', content: 'Gratitude and Strength' },
					{
						type: 'text',
						content:
							'Little Green Leaves brought warmth, passed on care, and received strength from leaders, loving families, and students alike. I am deeply grateful for the opportunity to sow seeds of kindness — and thankful for the motivation that continues to push me forward on this journey.',
					},
				],
			},

			{
				id: '2019-Green Leaves and Kenya',
				title: 'Crossing Continents — Little Green Leaves in Kenya',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Place That Sparked Curiosity' },
					{
						type: 'text',
						content:
							'There is a place where a group of extraordinary children live. Their environment is harsh, yet they are filled with sunshine and optimism. I was deeply curious — I wanted to step into their world and truly feel their lives.',
					},
					{
						type: 'image',
						src: imgKenya1,
						alt: 'Kenyan children',
						caption: 'Children in Kenya full of sunshine and optimism.',
					},

					{ type: 'subtitle', content: 'Maasai Mara, Kenya' },
					{
						type: 'text',
						content:
							'Yes, you guessed it — this place is Maasai Mara, Kenya. Back in the same season of 2015, I ran across the vast savannah alongside wildlife, rose into the sky in a hot air balloon with the sun, and watched hippos migrate along the Mara River. It was a place where I gained friendship and wisdom — a place that left a lasting mark on my heart.',
					},
					{ type: 'image', src: imgKenya2, alt: 'Maasai Mara landscape', caption: 'The vast Maasai Mara landscape.' },
					{ type: 'subtitle', content: 'People Who Inspired My Action' },
					{
						type: 'text',
						content:
							'There were also two remarkable people — a married couple and partners in mission. They made the bold decision to leave their positions at the United Nations — a choice that might seem a little crazy to many — and founded TAIV. I deeply admired them and wanted to understand their vision, to participate, and to walk alongside them.',
					},
					{ type: 'image', src: imgKenya3, alt: 'TAIV founders', caption: 'The founders of TAIV.' },

					{ type: 'subtitle', content: 'Returning as an International Volunteer' },
					{
						type: 'text',
						content:
							'This time, I returned to Africa as an international volunteer. I came to learn more about Africa, to understand it more deeply, and to fulfill a long-held wish: to build a Chinese-language reading corner there, so African children could learn about China and Chinese culture.',
					},
					{
						type: 'text',
						content: 'True exchange begins with culture. True care comes from the heart.',
					},

					{ type: 'subtitle', content: 'Little Green Leaves Has Arrived' },
					{
						type: 'text',
						content:
							'In this winter in Kenya, Little Green Leaves has arrived — bringing the warmth of spring, bringing the fresh green of new beginnings. We are here. We are here. We are here.',
					},
					{
						type: 'image',
						src: imgKenya4,
						alt: 'Green Leaves in Kenya',
						caption: 'Green Leaves in Kenya.',
					},
				],
			},
			{
				id: '2019-kenya-masai-mara-un',
				title: 'Little Green Leaves’ African Journey — Maasai Mara & the United Nations',
				detailBlocks: [
					{ type: 'subtitle', content: 'Back to the Savannah' },
					{
						type: 'text',
						content:
							'After completing our teaching experience at the orphanage, the volunteers regrouped and set out once again — heading toward the vast Maasai Mara savannah. It was a place that had once left me in awe, a place I could never forget.',
					},

					{ type: 'subtitle', content: 'Memories from 2015' },
					{
						type: 'text',
						content:
							'Back in 2015, driven by pure curiosity, I had experienced everything here — tracking the great migration, chasing lions across the plains, watching wildlife under pouring rain and blazing sun. In those moments, I truly felt the power and beauty of nature.',
					},
					{
						type: 'image',
						src: imgKenya11,
						alt: 'Wildlife in Maasai Mara',
						caption: 'The majestic wildlife of Maasai Mara.',
					},

					{ type: 'subtitle', content: 'A Small Wish' },
					{
						type: 'text',
						content:
							'To be honest, I returned this time with a small wish: to meet the lion family in the rain once more. It was them who gave me a deeper understanding of parental love. I wasn’t sure if the lions we saw were the same ones — but even encountering them again felt like fate.',
					},
					{ type: 'subtitle', content: 'A Day Chasing Life' },
					{
						type: 'text',
						content:
							'Blessed by a bit of luck, we encountered even more animal friends throughout the day. After hours of tracking wildlife, we returned to the lodge at sunset. That evening, as we watched the Maasai people perform their passionate bonfire dance, I realized something had changed.',
					},
					{ type: 'image', src: imgKenya12, alt: 'Maasai wildlife', caption: 'Maasai wildlife encounters.' },
					{
						type: 'text',
						content:
							'The scenery was still breathtaking, the animals still free and graceful — yet everything outside the vehicle window felt different. It was as if I were standing between two worlds. Though I couldn’t yet put the feeling into words, I knew this was the quiet transformation that comes from experience and exploration.',
					},
					{
						type: 'image',
						src: imgKenya13,
						alt: 'Sunset in Maasai Mara',
						caption: 'A breathtaking sunset in Maasai Mara.',
					},

					{ type: 'subtitle', content: 'From Wilderness to the City' },
					{
						type: 'text',
						content:
							'The final stop of our Kenya journey took us to what felt like the “opposite extreme” — Nairobi, often called the Paris of East Africa. Here, we experienced Kenya’s urban culture and, most importantly, had the honor of visiting two major United Nations headquarters: the United Nations Environment Programme (UNEP) and UN-Habitat.',
					},

					{ type: 'subtitle', content: 'Inside the United Nations' },
					{
						type: 'text',
						content:
							'At the UN compound in northern Nairobi, we sat under warm sunlight, listened to birdsong, and felt a sense of solemnity and respect. We observed every detail that made this place unique. Seeing the trees personally planted by former Chinese presidents Hu Jintao and Jiang Zemin instantly connected us to the powerful strength of our homeland.',
					},
					{
						type: 'text',
						content:
							'We also saw the educational supplies prepared by the United Nations for refugee children. The sight filled us with both awe and deep emotion. In that moment, we silently prayed for a world free of war and filled with peace — a truly world-class experience.',
					},

					{ type: 'subtitle', content: 'Sitting in the Seat of Responsibility' },
					{
						type: 'text',
						content:
							'By coincidence, our visit took place during a UN recess, and Little Green Leaves had the rare opportunity to act as representatives of China to the United Nations — with photos to prove it!',
					},
					{
						type: 'text',
						content:
							'Having previously participated in Model United Nations, sitting in the actual UN conference seat sparked an immediate sense of mission and responsibility within me. The same chair felt entirely different here — perhaps this is how energy is passed on. I even delivered a short mock “speech,” and yes — even the Wi-Fi was reserved for UN delegates. A truly world-class experience.',
					},
					{ type: 'image', src: imgKenya14, alt: 'UN visit', caption: 'A memorable visit to the United Nations.' },

					{ type: 'subtitle', content: 'A World-Class Aspiration' },
					{
						type: 'text',
						content:
							'Although our visit to the United Nations lasted only half a day, the impact was profound. In this world-class institution, we had a world-class experience — one that quietly reaffirmed my belief that I could become a world-class individual, pursue world-class dreams, and one day help make the world a better place.',
					},

					{
						type: 'image',
						src: imgKenya15,
						alt: 'Unforgettable moments at UN',
						caption: 'Unforgettable moments at the United Nations.',
					},
				],
			},
			{
				id: 'shared-smiles-shared-effort',
				title: 'Smiling Faces. Moving Forward Together',
				detailBlocks: [
					{ type: 'subtitle', content: 'Different Lives, the Same Childhood' },
					{
						type: 'text',
						content:
							'We live on the same planet, in the same era — yet in different countries, different environments, and with vastly different life experiences. They are children just like their peers, yet they carry a special label: the vulnerable. Their names differ — left-behind children, orphans, refugees — but the weight they carry is deeply similar.',
					},

					{ type: 'subtitle', content: 'The Moment That Changed Me' },
					{
						type: 'text',
						content:
							'In 2016, when I was twelve years old, I first met a child from a poor family. He was three years younger than me. When I gave him a few books, his reaction deeply moved me. That moment led me to decide to help children in impoverished mountain areas build reading corners — because I believed books were what they needed most.',
					},
					{ type: 'image', src: imgSmile1, alt: 'Child receiving books' },
					{
						type: 'text',
						content:
							'Over three years, we raised more than 20,000 donated books through various efforts and supported five mountain village primary schools. Yet as I visited these schools and spent time with the children, I realized something unexpected.',
					},
					{ type: 'image', src: imgSmile2, alt: 'Children in mountain school' },
					{
						type: 'text',
						content:
							'They were not as joyful as I had imagined. Some were introverted and avoided communication. Some lacked confidence and struggled to make friends. Others had poor hygiene or weak study habits. After speaking with teachers, I learned that most of them were left-behind children — raised mainly by grandparents while one or both parents worked far away. What they lacked most was not material support, but emotional care and warmth.',
					},

					{ type: 'subtitle', content: 'Africa: Joy Amid Scarcity' },
					{
						type: 'text',
						content:
							'In the summer of 2019, I had the opportunity to visit a welfare home in Africa that housed over 300 children. More than 100 of them were orphans; others had been taken in from the streets by their “daddy.” Their daily meals consisted only of boiled beans and rice. The water they drank was yellowish and murky, even after settling.',
					},
					{ type: 'image', src: imgSmile3, alt: 'African orphanage children' },
					{
						type: 'text',
						content:
							'Yet whenever someone visited, they greeted us with bright, optimistic smiles. The children were warm and eager to help with chores. They were curious and loved learning, constantly asking teachers questions. They had never left the compound and were deeply curious about the world beyond its walls. Whenever they saw me or other teachers, they asked for food and school supplies — not out of greed, but because resources were so scarce.',
					},
					{
						type: 'text',
						content:
							'I couldn’t help but wonder: how could children living in such harsh conditions remain so optimistic and motivated?',
					},

					{ type: 'subtitle', content: 'Meeting Refugee Children' },
					{
						type: 'text',
						content:
							'At the start of my tenth-grade year, I joined a school-organized community program that brought me face-to-face with children in a refugee camp. Sometimes I taught them English. Sometimes we played games together. Other times, I wrote them letters filled with encouragement and care.',
					},
					{
						type: 'text',
						content:
							'Some children were quiet and reserved, but most were sincere, optimistic, and deeply respectful of others’ feelings. I remember one visit vividly. We entered a crude building called a “classroom.” The children’s eyes were wide with nervous curiosity. Though timid, they stood up and introduced themselves bravely at the teacher’s request, then carefully accepted the “letters of love” we had written.',
					},
					{ type: 'image', src: imgSmile4, alt: 'Refugee children receiving letters' },
					{
						type: 'text',
						content:
							'They read every word attentively. Later, they wrote their dreams on inflated balloons. In my group, one child dreamed of becoming a professor, another of becoming a math teacher. After writing, they hugged their balloons tightly, afraid they might be damaged. It was clear how much their dreams meant to them — and I truly believe they will work hard to achieve them.',
					},

					{ type: 'subtitle', content: 'Joy in the Simplest Moments' },
					{
						type: 'text',
						content:
							'They had very little for entertainment — just one old football. After the initial shyness faded, we began playing together. The “soccer field” was a small dirt courtyard, barely 50–60 square meters. One section of wall served as the goal; if the ball hit it, it counted as a score.',
					},
					{ type: 'image', src: imgSmile5, alt: 'Playing football with refugee children' },
					{
						type: 'text',
						content:
							'I tried to let them score more goals, but they insisted on playing by the rules. Sometimes, they even looked out for my feelings. Every child’s face was filled with laughter, and we played joyfully together.',
					},

					{ type: 'subtitle', content: 'What They Truly Need' },
					{
						type: 'text',
						content:
							'Left-behind children have parents, yet lack emotional companionship. African orphans have no parents and face extreme material scarcity, yet remain optimistic. Refugee children have no country — and although they appear cheerful, the lack of security is visible in their eyes.',
					},
					{
						type: 'text',
						content:
							'What can I do for these children? This is the question I continue to study and reflect on. I hope to find the best way to support them — not only materially, but also emotionally and psychologically — giving them what they truly need most.',
					},
				],
			},
			{
				id: 'kangbao-winter-warmth-part-1',
				title: 'Connected by Warmth in the Deepest Winter (Part I)',
				detailBlocks: [
					{ type: 'subtitle', content: 'Arriving Through Snow' },
					{
						type: 'text',
						content:
							'Traveling through snow, the harsh winter of the Bashang Plateau revealed a unique beauty. While feeling the biting cold, we also witnessed the changes taking place in Kangbao. More than ninety newly built residential buildings for relocated families stood neatly along the roads. Covered in snow, the wide, straight streets seemed even broader. In the cold wind, hints of New Year celebrations quietly filled the air.',
					},

					{ type: 'subtitle', content: 'A Year of Connection, A Moment of Fulfillment' },
					{
						type: 'text',
						content:
							'One year ago, Little Green Leaves formed a meaningful bond with Kangbao. Through this connection, we met Ms. Liu Yanfeng, Deputy Mayor of Kangbao Town — a warm-hearted leader who generously helped connect Little Green Leaves with Dongguan Primary School and Qinglong Village Primary School. Today, ten Little Green Leaves Reading Corners were officially completed at the two schools.',
					},

					{ type: 'subtitle', content: 'A Warm Welcome at Dongguan Primary School' },
					{
						type: 'text',
						content:
							'Accompanied by their families, two members of the Little Green Leaves Volunteer Alliance arrived at Dongguan Primary School. The principal introduced the newly constructed teaching building and the bright, spacious classrooms the students had just moved into.',
					},
					{
						type: 'image',
						src: imgKangbaoPart11,
						alt: 'Green Leaves arrived at school',
						caption: 'Two members of Little Green Leaves arriving at Dongguan Primary School.',
					},
					{
						type: 'text',
						content:
							'Leaders from the county, town, and education bureau joined the event, including Chairwoman Zhao Yongfang of the County Women’s Federation, Deputy Mayor Liu Yanfeng, Director Jiang Linke from the Education and Sports Bureau, Principal Zhou Yushan of Dongguan Primary School, and Principal Kou Zhongchang of Qinglong Village Primary School. More than 100 teachers and students from both schools participated, reflecting the strong support and attention from local leadership.',
					},

					{ type: 'subtitle', content: 'Standing Once Again as a Young Pioneer' },
					{
						type: 'text',
						content:
							'When I once again put on the familiar red Young Pioneer scarf, heard the powerful background music, and saw the students salute with precision, I felt as if I had returned to my own elementary school days. Touching the red scarf on my chest brought an instant sense of closeness with the students — and filled me with unexpected strength.',
					},
					{
						type: 'image',
						src: imgKangbaoPart12,
						alt: 'Wearing red scarf',
						caption: 'Wearing the red scarf again brought unexpected strength.',
					},

					{ type: 'subtitle', content: 'Sharing Dreams and Strength' },
					{
						type: 'text',
						content:
							'With gratitude in my heart, Little Green Leaves shared the importance of dreams and the experience of studying abroad. It was because of a dream that the Little Green Leaves Volunteer Alliance was founded — and because of that same dream that we continue to move forward, bringing warmth wherever we go.',
					},
					{
						type: 'text',
						content:
							'Studying abroad deepened my appreciation for my homeland — for family, food, and the sense of pride that comes from knowing a strong nation stands behind us. I told the younger students that although some of them may face challenges in learning or daily life, these hardships are trials meant to strengthen their will and independence. The message was warmly received, and I could see a change in the children’s eyes — confidence slowly beginning to shine.',
					},

					{ type: 'subtitle', content: 'More Than a Backpack' },
					{
						type: 'text',
						content:
							'During this Kangbao visit, Little Green Leaves also brought love-filled backpacks to more than twenty students from disadvantaged families. While they may not urgently need material assistance, we hoped this gesture would help us draw closer to their hearts — allowing them to feel cared for and reminding them that beauty exists everywhere in life.',
					},
					{
						type: 'text',
						content:
							'From this day forward, Little Green Leaves believes that these backpacks carry not only books and knowledge, but also warmth, love, and the power of dreams.',
					},

					{ type: 'subtitle', content: 'Building Reading Corners, One by One' },
					{
						type: 'text',
						content:
							'Accompanied by teachers, the two Little Green Leaves volunteers visited each classroom to place the reading corners and personally attach the “Little Green Leaves Reading Corner” labels. Each completed reading corner felt like a treasured accomplishment — a space built with care, effort, and hope.',
					},
					{
						type: 'text',
						content:
							'We believe these donated books will bring not only knowledge, but also warmth that reaches deep into the children’s hearts.',
					},
					{
						type: 'image',
						src: imgKangbaoPart13,
						alt: 'Reading corner setup',
						caption: 'Setting up the reading corners with care.',
					},

					{ type: 'subtitle', content: 'Energy Passed On' },
					{
						type: 'text',
						content:
							'Dongguan Primary School specially organized a jump-rope performance, reflecting the school’s dedication to students’ physical and mental well-being. Watching the children’s energetic and positive spirit was deeply moving.',
					},
					{
						type: 'text',
						content:
							'Little Green Leaves delivered warmth, shared care, and received energy in return from leaders, teachers, and students alike. Each visit allows me to grow from a new perspective. I am deeply grateful for the opportunity to sow seeds of kindness — and thankful for the strength that continues to guide me forward.',
					},
				],
			},
			{
				id: 'kangbao-winter-warmth-part-2',
				title: 'Connected by Warmth in the Deepest Winter (Part II)',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Different Atmosphere' },
					{
						type: 'text',
						content:
							'After the event at Dongguan Primary School, we traveled together with the students from Qinglong Village Primary School back to their campus. From the moment the activities began, it was clear that these children were different from those at Dongguan. Their movements were more restrained, and their eyes lacked the confidence we had seen earlier.',
					},
					{
						type: 'image',
						src: imgKangbaoPart14,
						alt: 'Qinglong Village Primary School',
						caption: 'Arriving at Qinglong Village Primary School.',
					},

					{ type: 'subtitle', content: 'Understanding Their Reality' },
					{
						type: 'text',
						content:
							'After listening to the principal’s introduction, we learned that the school had just over 80 students, most of whom lived in even more difficult circumstances. Nearly all were left-behind children or orphans. I sat among them, speaking openly and gently about topics we all cared about.',
					},
					{
						type: 'image',
						src: imgKangbaoPart15,
						alt: 'Listening to students',
						caption: 'Listening to the the principal at Qinglong.',
					},
					{
						type: 'text',
						content:
							'Some had lost their parents; others had parents working far away. As a result, they lived in rented collective dormitories near the school. When I asked about their relationship with teachers, their eyes instinctively shifted away. They liked their teachers, yet were also afraid of them — afraid to ask questions when they didn’t understand.',
					},
					{
						type: 'image',
						src: imgKangbaoPart16,
						alt: 'Students at Qinglong',
						caption: 'Students at Qinglong Village Primary School.',
					},

					{ type: 'subtitle', content: 'Planting Confidence' },
					{
						type: 'text',
						content:
							'Little Green Leaves shared personal experiences to help the children understand the importance of confidence. We believe that from this day forward, they will no longer feel inferior because they are left-behind children or because they lack parental companionship.',
					},

					{ type: 'subtitle', content: 'Books, Joy, and Belonging' },
					{
						type: 'text',
						content:
							'Standing in the completed reading corner at Qinglong Village Primary School, the principal personally helped attach the “Little Green Leaves Reading Corner” sign and asked about the meaning behind the Little Green Leaves logo. Watching the children immersed in reading filled us with indescribable happiness.',
					},
					{
						type: 'image',
						src: imgKangbaoPart17,
						alt: 'Reading corner at Qinglong',
						caption: 'The reading corner at Qinglong Village Primary School.',
					},

					{ type: 'subtitle', content: 'A New Beginning for the Youngest Ones' },
					{
						type: 'text',
						content:
							'Principal Kou then showed us the newly built kindergarten. We prepared clay and educational toys for the younger children. Their classrooms and surroundings were beautifully decorated with care by their teachers. Watching the children learn and play freely in such a warm environment made us feel both joyful and a little envious.',
					},

					{ type: 'subtitle', content: 'Carrying Warmth Into the Future' },
					{
						type: 'text',
						content:
							'The festive decorations in the kindergarten classrooms were so full of warmth that I decided to borrow this image to mark the final act of kindness in 2019. Looking ahead to 2020 — and even further into the future — Little Green Leaves will continue walking this path.',
					},
					{
						type: 'image',
						src: imgKangbaoPart18,
						alt: 'Kindergarten decorations',
						caption: 'Festive decorations in the kindergarten classrooms.',
					},
					{
						type: 'text',
						content:
							'As Romain Rolland once said, “The most beautiful music of the soul is kindness.” Little Green Leaves hopes to follow this music together with more people — allowing our small dreams to merge into the greater Chinese Dream. Let us continue chasing dreams and moving forward with warmth.',
					},
					{
						type: 'text',
						content: 'Little Green Leaves growing into a forest — thank you for being part of this journey.',
					},
				],
			},
		],
		icon: Users,
	},
	{
		year: 2020,
		title: 'Weathering the Storm',
		summary: 'How we adapted operations during COVID-19 to maintain love and aid delivery.',
		events: [
			{
				id: 'kangbao-warmth-back-on-duty',
				title: '2020 - Back on Duty with Warmth',
				detailBlocks: [
					{ type: 'subtitle', content: 'Warmth Returns to Service' },
					{
						type: 'text',
						content:
							'Just after the holiday ended and Little Green Leaves returned to school, we received wonderful news from our “warm-hearted deputy mayor auntie” in Kangbao Town. Fifteen boxes containing 684 pieces of donated clothing, mailed to Kangbao during the break, had finally been officially “rehired” and put back on duty.',
					},
					{
						type: 'text',
						content:
							'Under the careful coordination of Deputy Mayor Liu Yanfeng, these love-filled clothes were distributed to five villages and delivered directly to families and individuals in need. Once retired from daily use, these clothes returned with a new mission — and I believe they felt a deep sense of pride.',
					},

					{ type: 'subtitle', content: 'Smiles That Made Everything Worth It' },
					{
						type: 'text',
						content:
							'Seeing the photos of people holding the clothes with joyful smiles filled Little Green Leaves with overwhelming happiness — words simply weren’t enough to describe the feeling.',
					},
					{
						type: 'image',
						src: imgBack1,
						alt: 'Recipients with donated clothes',
						caption: 'Joyful recipients of donated clothes.',
					},
					{
						type: 'image',
						src: imgBack2,
						alt: 'Recipients with donated clothes',
						caption: 'Joyful recipients of donated clothes.',
					},
					{
						type: 'image',
						src: imgBack3,
						alt: 'Recipients with donated clothes',
						caption: 'Joyful recipients of donated clothes.',
					},
					{
						type: 'image',
						src: imgBack4,
						alt: 'Recipients with donated clothes',
						caption: 'Joyful recipients of donated clothes.',
					},
					{ type: 'subtitle', content: 'Every Effort Remembered' },
					{
						type: 'text',
						content:
							'Thinking back to every holiday spent carefully selecting, stacking, packing, and labeling each item — scene after scene replayed like a movie. In this moment, everything felt completely worth it.',
					},
					{
						type: 'image',
						src: imgBack5,
						alt: 'Packing donated clothes',
						caption: 'Packing donated clothes with care.',
					},
					{
						type: 'text',
						content:
							'To all the kindhearted uncles and aunties who supported Little Green Leaves: we are delivering your love and your kindness. I am both a messenger and a recipient — every act of love flows through Little Green Leaves, and the very first person to be warmed is me.',
					},

					{ type: 'subtitle', content: 'A Channel of Love' },
					{
						type: 'text',
						content:
							'I am a messenger, but also a relay station — ensuring that every act of kindness reaches those in need as quickly and fully as possible.',
					},
					{
						type: 'image',
						src: imgBack6,
						alt: 'Delivering donated clothes',
						caption: 'Delivering donated clothes to those in need.',
					},
					{
						type: 'text',
						content:
							'The channel of love at Little Green Leaves will always remain open, waiting for you with a smile. Thank you for your trust — it strengthens our confidence. Thank you for your kindness — it fuels our persistence. Thank you for choosing to believe — it reminds us that the road of dreams is lined with beauty. Thank you for your love — it gives us the courage to keep moving forward with warmth.',
					},
				],
			},

			{
				id: 'extraordinary-people-in-an-extraordinary-battle',
				title: 'Extraordinary People in this Extraordinary Battle against COVID-19',
				detailBlocks: [
					{ type: 'subtitle', content: 'Strength Born from Unity' },
					{
						type: 'text',
						content:
							'As Ostrovsky once said, “A shared cause and a shared struggle give people the strength to endure everything.” During this time, I witnessed a powerful force rising from our homeland — a strength born not from one individual, but from countless ordinary people who quietly gave their all.',
					},
					{
						type: 'image',
						src: imgCovid1,
						alt: 'strength from unity',
						caption: 'Strength born from unity.',
					},

					{ type: 'subtitle', content: 'A Sudden Storm' },
					{
						type: 'text',
						content:
							'A sudden outbreak disrupted the rhythm of everyday life. As confirmed cases continued to rise and the risk of transmission spread, everyone came to feel the gravity of this war against the pandemic.',
					},

					{ type: 'subtitle', content: 'All Hands on Deck' },
					{
						type: 'text',
						content:
							'In the face of this battle:\n\nThe Party and government implemented precise policies and went deep into the front lines.\nMedical workers charged ahead with scientific prevention and treatment.\nThe armed forces followed orders without fear of danger.\nPolice officers safeguarded public security amid the outbreak.\nVolunteers kept cities running.\nSanitation workers maintained clean streets.\nDelivery drivers brought fresh vegetables to residential buildings.\n\nFrom north to south, from east to west, the entire nation stood united.\nFrom the front lines in Wuhan to every corner of the country, people fought day and night.',
					},
					{
						type: 'image',
						src: imgCovid2,
						alt: 'All hands on deck',
						caption: 'All hands on deck during the pandemic.',
					},

					{ type: 'subtitle', content: 'Acts of Kindness, Big and Small' },
					{
						type: 'text',
						content:
							'Within this collective effort, we also saw countless acts of kindness — the goodwill of Little Green Leaves, the loving contributions of my father, and my mother’s thoughtful gesture of placing tissues in elevators to reduce contact for others.',
					},
					{
						type: 'text',
						content: 'Scene by scene, moment by moment, act by act — all carried out by the most ordinary people.',
					},
					{
						type: 'image',
						src: imgCovid3,
						alt: 'Acts of kindness',
						caption: 'Acts of kindness, big and small.',
					},

					{ type: 'subtitle', content: 'Ordinary People, Extraordinary Strength' },
					{
						type: 'text',
						content:
							'It was their small contributions that forged an unbreakable collective force.\nIt was their selflessness that created the miracle of Huoshenshan Hospital and the legendary speed of China.\nIt was their courage that produced breathtaking scenes of marching into danger through wind and snow.\nIt was their dedication that embodied the Chinese spirit — fearless in hardship, unstoppable in resolve.\nIt was their unity that carried love and support across regions, day and night.\nIt was their silent perseverance that strengthened our belief that we would not bow to adversity — that rainbows always follow storms.',
					},
					{
						type: 'text',
						content:
							'Their sweat, tears, and even blood showed us that winter would pass and spring was quietly approaching. They raced against time and risked their lives so that we could understand this truth: there is no such thing as effortless peace — it exists because someone else carries the burden for you.',
					},
					{
						type: 'image',
						src: imgCovid4,
						alt: 'Ordinary people extraordinary strength',
						caption: 'Father donating for the battle against COVID-19.',
					},

					{ type: 'subtitle', content: 'One Heart, One Boat' },
					{
						type: 'text',
						content:
							'When countless ordinary people come together, it becomes solidarity.\nWhen countless extraordinary acts come together, it becomes shared survival.\nWhen countless moments weave together, it becomes unity.',
					},
					{
						type: 'image',
						src: imgCovid5,
						alt: 'One heart one boat',
						caption: 'Mom helping reduce contact in elevators.',
					},

					{ type: 'subtitle', content: 'Looking Toward Spring' },
					{
						type: 'text',
						content:
							'When spring flowers bloom, the battle will be won, and the pandemic will fade.\n\nBless our homeland.\nMay the years ahead be peaceful, and the nation secure.',
					},
				],
			},
			{
				id: 'longing-and-hope',
				title: 'Longing',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Spring Break Unlike Any Other' },
					{
						type: 'text',
						content:
							'In the blink of an eye, a week of the long-awaited spring break had already passed. My emotions shifted from frustration before the break (not being able to go home), to fear (worrying about the pandemic), and eventually to a sense of calm and letting go. I had imagined many ways to spend spring break — visiting a city supermarket to satisfy my “Chinese stomach,” exploring nearby attractions to comfort my “Chinese heart.”',
					},
					{
						type: 'text',
						content:
							'But as COVID-19 spread relentlessly, closures and lockdowns followed everywhere. The excitement I once felt was suddenly extinguished, replaced by confusion and helplessness. Watching the number of confirmed cases rise, I felt genuinely afraid. More than once, I told my mom, “I want to go home — it feels safest there.”',
					},
					{
						type: 'text',
						content:
							'Yet reality had to be faced. Once I calmed down, staying on campus did not seem so bad after all. The school was safe. Days passed quietly in the dormitory — waking naturally, arranging my own schedule, watching the sun rise in the early morning. On a campus meant for thousands, only about forty international students and seventy faculty and staff remained, leaving the grounds vast, empty, and silent.',
					},
					{ type: 'image', src: imgLonging1, alt: 'Empty campus', caption: 'An empty campus during the pandemic.' },

					{ type: 'subtitle', content: 'Lessons from the Classroom' },
					{
						type: 'text',
						content:
							'Looking back at the past two months of the semester, life had been full and intense. My first experience with AP Capstone was, as expected, mentally demanding — and even more challenging than the previous term. One project followed another.',
					},
					{
						type: 'text',
						content:
							'The first was a group project requiring three students to research and discuss a shared topic. Because I was unable to use a VPN during winter break, I lost contact with my teammates. When I returned to school and asked about the project, I was told the topic focused on “re-education camps” in Xinjiang, which they referred to as “concentration camps” and even compared to Nazi camps.',
					},
					{
						type: 'text',
						content:
							'I was stunned. Growing up, everything I had heard, seen, and experienced about my country was positive. Hearing such claims felt deeply unsettling — like someone suddenly criticizing your parents. My instinct was resistance and disbelief.',
					},
					{
						type: 'text',
						content:
							'I called my parents immediately. Sensing my anxiety, my mother reminded me that nothing in this world is perfect — not even parents, let alone a vast country. What matters is perspective, position, and whether we approach issues rationally and thoughtfully. Her words grounded me.',
					},
					{
						type: 'text',
						content:
							'I then communicated openly with my teammates, sharing my views respectfully. I thanked them for their interest in China, explained that my personal experience in Xinjiang differed greatly from what they imagined, and noted the political sensitivity of the topic. I suggested that Xinjiang and Nazi concentration camps were fundamentally different in nature — and invited them to visit China one day to see for themselves.',
					},
					{
						type: 'text',
						content:
							'To my relief, they agreed the topic was difficult to handle. Under my suggestion, we shifted our focus to China’s livestreaming industry. Over the following weeks, our group worked closely together, resolved challenges, produced a paper we were proud of, and successfully presented our research to classmates and teachers.',
					},

					{ type: 'subtitle', content: 'Hope in Parallel' },
					{
						type: 'text',
						content:
							'With two months remaining before AP Capstone ended, I suddenly realized how similar this project journey was to the emotional process of facing the pandemic — fear, acceptance, reflection, and eventually hope.',
					},
					{
						type: 'text',
						content: 'I look forward to earning the results I hope for at the end of the AP Capstone semester.',
					},
					{
						type: 'text',
						content: 'I look forward to the global fight against COVID-19 achieving victory soon.',
					},

					{ type: 'subtitle', content: 'Seeing the World Clearly' },
					{
						type: 'text',
						content:
							'Recently, I read a sentence about pandemic response: “China fought the first half, the world fights the second half, and parents of international students fight the whole game.”',
					},
					{
						type: 'text',
						content:
							'I saw the immense sacrifices made by the Chinese people, the precise policies from the central government, the scientific dedication of medical workers, and the unity of the entire nation — from cities to rural areas — responding in silence and discipline. Every step reflected collective wisdom.',
					},
					{
						type: 'text',
						content:
							'China’s first half of the battle was nearing victory, yet the pandemic reminded us that we truly live in a global village. “The world is one family” became vividly real. The strategies of the world’s second half may differ, but I believe it can be fought well — perhaps even brilliantly — with China’s experience as a guide. This, to me, is the quiet confidence of a great nation.',
					},
					{ type: 'image', src: imgLonging2, alt: 'Global unity', caption: 'Unity in a global village.' },

					{ type: 'subtitle', content: 'What I Long For' },
					{
						type: 'text',
						content: 'I long for the pandemic to end, so my parents no longer worry.',
					},
					{
						type: 'text',
						content: 'I long for the pandemic to end, so I can return home safely in the summer.',
					},
					{
						type: 'text',
						content: 'I long for the pandemic to end, so we may respect all life and be grateful to nature.',
					},
					{
						type: 'text',
						content:
							'I long for the pandemic to end, so the winds are gentle, the rains timely, and the nation at peace.',
					},
					{ type: 'image', src: imgLonging3, alt: 'Peaceful nature', caption: 'Wishing for peace and harmony.' },
				],
			},
			{
				id: 'pandemic-reflections',
				title: 'What the Pandemic Gave Me',
				detailBlocks: [
					{ type: 'subtitle', content: 'Born Into Viruses, Learning to Respect Them' },
					{ type: 'image', src: imgPandemic1, alt: 'Respecting viruses', caption: 'Learning to respect viruses.' },
					{
						type: 'text',
						content:
							'Born in June 2003 during the SARS outbreak, I seemed to have an instinctive fearlessness toward viruses. When COVID-19 first emerged in 2020, I felt calm and continued my daily studies and life, believing it posed little threat to me.',
					},
					{
						type: 'text',
						content:
							'That sense of calm changed the moment Wuhan was locked down and the entire country stayed home overnight. I realized the severity of the situation — this outbreak was far more aggressive than SARS. I followed the news closely: Academician Zhong Nanshan entering the epicenter at age eighty; thousands of medical workers rushing to the front lines; soldiers deploying; and emergency hospitals rising from the ground at astonishing speed.',
					},
					{
						type: 'text',
						content:
							'From these moments, I witnessed China’s unity, speed, strength, and spirit. My pride as a Chinese citizen grew stronger than ever. Though I continued studying abroad, my concern for my family and homeland never diminished.',
					},

					{ type: 'subtitle', content: 'Fear, Uncertainty, and Self-Care' },
					{
						type: 'text',
						content:
							'Just as the domestic situation improved, the pandemic spread rapidly across the globe. Fear set in. Spring break plans were canceled, campuses closed, and all classes moved online. Every plan I had was disrupted.',
					},
					{
						type: 'text',
						content:
							'During quarantine on campus, my emotions fluctuated intensely — especially after catching a cold while already dealing with chronic pharyngitis. Although I knew it was unrelated to COVID-19, unease lingered. I took medicine daily and checked my temperature until I fully recovered. That moment taught me something important: learning to worry about and care for my own health.',
					},

					{ type: 'subtitle', content: 'Finding Joy in Simple Satisfaction' },
					{
						type: 'text',
						content:
							'One day, I opened my drawer to find that all my “Chinese-flavored” snacks from home were gone. Just when I thought my Chinese appetite would go unsatisfied, I discovered two cans of luncheon meat and a Haidilao hotpot kit. I jumped with excitement — a small treasure hidden in a drawer.',
					},
					{
						type: 'text',
						content:
							'That simple, unexpected joy — the satisfaction of something easily found — was also a gift the pandemic gave me.',
					},

					{ type: 'subtitle', content: 'Learning to Cook, Learning to Live' },
					{
						type: 'text',
						content:
							'Since returning home wasn’t possible, I chose acceptance over frustration. Cooking was something I had never done before — not even watched closely at home. Yet during isolation, I began learning to cook, starting with fried rice, then tomato and egg stir-fry, onion and egg, Kung Pao chicken, and eventually steak.',
					},
					{
						type: 'text',
						content:
							'I couldn’t believe these dishes came from my own hands. Cooking was complicated — washing vegetables, cutting meat, enduring oil splashing on my hands — and in the process, I truly felt my mother’s daily effort. But tasting my own food brought a completely different sense of fulfillment.',
					},
					{
						type: 'image',
						src: imgPandemic2,
						alt: 'Learning to cook',
						caption: 'Learning to cook during the pandemic.',
					},
					{
						type: 'text',
						content:
							'I experienced what “easy to say, hard to do” really means. I learned that practice builds skill, and effort brings joy. Even though cooking started as a necessity, choosing to love life sincerely — that, too, was something the pandemic gave me.',
					},

					{ type: 'subtitle', content: 'The Taste of Effort' },
					{
						type: 'text',
						content:
							'The first time I cooked Kung Pao chicken, it took nearly two hours from preparation to completion. When my mom asked how it tasted, I joked that it must be better than hers — because it carried the taste of effort, patience, experience, and a faint trace of something that felt like home.',
					},
					{
						type: 'image',
						src: imgPandemic3,
						alt: 'Home-cooked meal',
						caption: 'A home-cooked meal during the pandemic.',
					},
					{
						type: 'text',
						content:
							'I learned to make stir-fried flatbread, even though my knife skills were far from perfect. I tried steak from scratch, carefully studying recipes online before starting. Each success brought not just satisfaction to my stomach, but a quiet sense of personal achievement.',
					},

					{ type: 'subtitle', content: 'Labor, Gratitude, and Growth' },
					{
						type: 'text',
						content:
							'On International Workers’ Day, I realized that labor truly is honorable. I don’t know whether I’ll be able to return home safely during the summer, but what I can do is live responsibly, study well, and avoid causing trouble for others.',
					},
					{
						type: 'text',
						content:
							'As both a witness and participant of SARS and COVID-19, my understanding of viruses has evolved with age. I have learned to respect science and revere nature. These lessons will flow through my blood, settle in my heart, and stay quietly within my subconscious — accompanying me as I continue moving forward.',
					},
				],
			},
			{
				id: '2020-africa-pbic-challenge',
				title: 'Nurturing an African Bond with Love — PBIC 2020 Public Benefit International Challenge for Youth',
				detailBlocks: [
					{ type: 'subtitle', content: 'A New Beginning: Entering the Challenge' },
					{
						type: 'text',
						content:
							'Little Green Leaves was about to take on a new challenge — our very first competition. In 2020, we formed a new team and officially decided to participate in the PBIC (Public Benefit International Challenge for Youth), marking a brand-new way of delivering care and compassion.',
					},
					{ type: 'image', src: imgPBIC1, alt: 'PBIC Challenge', caption: 'Entering the PBIC Challenge in 2020.' },
					{
						type: 'text',
						content:
							'This was our first time entering an international social innovation competition, and also our first attempt to share love and responsibility through a structured, project-based approach. It was both exciting and challenging.',
					},

					{ type: 'subtitle', content: 'A New Year’s Wish for Africa' },
					{
						type: 'text',
						content:
							'Little Green Leaves’ first New Year wish of 2020 was clear: to continue caring for Africa, to renew our bond with the continent, and to help children in orphanages build a proper library.',
					},

					{ type: 'subtitle', content: 'Turning Vision into Action' },
					{
						type: 'text',
						content:
							'In May 2020, the opportunity finally arrived. After months of preparation, on May 17, 2020, Little Green Leaves officially registered for the PBIC as a team. Our three team members made a shared decision to take part in the Global Youth Social Innovation Challenge.',
					},
					{ type: 'image', src: imgPBIC2, alt: 'Team registration', caption: 'Registering the team for PBIC.' },
					{
						type: 'text',
						content:
							'Building on existing reading corners, our goal expanded beyond creating a library. We aimed to support more girls through additional approaches — helping them acquire knowledge, develop skills, and gain more possibilities for future employment.',
					},
					{
						type: 'text',
						content:
							'Through this project, we hoped to empower female students in African orphanages by broadening their perspectives through education and strengthening their abilities through training — enabling them to challenge gender inequality and reduce the unfair treatment and harm faced by women in their communities.',
					},
					{ type: 'image', src: imgPBIC3, alt: 'Project planning' },
					{ type: 'subtitle', content: 'Seeds of Growth and Love' },
					{
						type: 'text',
						content:
							'Today marks Xiaoman — a traditional Chinese solar term symbolizing the ripening of seeds and rivers nearing fullness. It felt like the perfect moment to hope for the fulfillment of Little Green Leaves’ wishes.',
					},
					{
						type: 'text',
						content:
							'And today is also May 20th — a day associated with love. On this special day, we are reminded not only to receive love, but also to share it intentionally and sincerely.',
					},
				],
			},
			{
				id: 'two-years-later-kangbao',
				title: 'Two Years Later — Watching You Grow',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Pause After the Challenge' },
					{
						type: 'text',
						content:
							'After the intense and exhilarating PBIC final pitch, Little Green Leaves decided to give ourselves a short break. During this special pause within an unusual year, we returned to a familiar place — Kangbao — to visit the younger brother and sister we had missed so much.',
					},
					{
						type: 'image',
						src: imgKangbao20201,
						alt: 'Visiting Kangbao',
						caption: 'Visiting Kangbao after two years.',
					},

					{ type: 'subtitle', content: 'The Same Road, A Different Season' },
					{
						type: 'text',
						content:
							'The last time I came to Kangbao, it was a bitterly cold winter with heavy snow drifting through the air. This time, the same road revealed a completely different landscape. Golden fields of blooming rapeseed flowers rushed past the car window. We stopped to feel the cool breeze and take in the beauty before us.',
					},
					{
						type: 'image',
						src: imgKangbao20202,
						alt: 'Rapeseed flowers',
						caption: 'Blooming rapeseed flowers in Kangbao.',
					},
					{ type: 'subtitle', content: 'First Impressions, Then and Now' },
					{
						type: 'text',
						content:
							'My first visit to Kangbao was in the summer of 2018. That was when I first met little brother Li Kang and little sister Ge Yanan. At the time, Li Kang was in kindergarten and Yanan was in third grade. They left me with the impression of being shy, timid, and hesitant to speak in front of unfamiliar people.',
					},
					{ type: 'image', src: imgKangbao20203, alt: 'Yanan', caption: 'Yanan in 2018.' },

					{ type: 'subtitle', content: 'Growth Over Two Years' },
					{
						type: 'text',
						content:
							'Over the past two years, I have visited them every school break. Slowly, the once introverted Li Kang has grown into a bright and optimistic boy. He has become more considerate as well — when he sees my mom carrying heavy bags, he hugs her and says, “Mom, you’ve worked so hard.”',
					},
					{
						type: 'text',
						content:
							'Yanan has also grown more open and confident. She now studies independently without her grandmother worrying, and I am truly happy for her. This autumn, she will enter sixth grade — and even little Li Kang is about to become a primary school student.',
					},
					{ type: 'image', src: imgKangbao20204, alt: 'Yanan', caption: 'Yanan in 2020.' },
					{
						type: 'text',
						content:
							'When he put on the new backpack I bought for him, he couldn’t stop saying how cool it was. His excitement was impossible to miss.',
					},

					{ type: 'subtitle', content: 'Small Joys, Big Pride' },
					{
						type: 'text',
						content:
							'Trying on new clothes is one of Li Kang’s greatest joys. Matching outfits and creating his own combinations gives him a strong sense of accomplishment. The outfit he wore that day was entirely his own choice — don’t underestimate him.',
					},
					{
						type: 'text',
						content:
							'Every time I visit, I take him to play on the village’s outdoor exercise equipment. He is always overjoyed. This time, carrying his brand-new basketball, we walked to the village court. We didn’t actually play much — instead, I listened to him enthusiastically boast about how strong he had become.',
					},

					{ type: 'subtitle', content: 'Moments Worth Remembering' },
					{
						type: 'text',
						content: 'As always, we took a photo together before I left. The little guy has definitely grown taller.',
					},
					{
						type: 'text',
						content:
							'When it was time to say goodbye, Li Kang ran out of the house and hugged me tightly. “Brother, you must come again in the winter. Goodbye, brother,” he said. In that moment, my heart completely melted.',
					},
					{ type: 'image', src: imgKangbao20205, alt: 'Li Kang', caption: 'Cute Li Kang' },

					{ type: 'subtitle', content: 'Seeing Her Transformation' },
					{
						type: 'text',
						content:
							'When we arrived at Yanan’s home, she was temporarily away picking up a package. Her grandmother said she would be back soon. When the doorbell rang, a cheerful, confident girl appeared. She looked surprised to see me — she hadn’t known I was coming.',
					},
					{
						type: 'text',
						content:
							'Through our conversation, I learned that she is now doing well both academically and in life. Her teachers like her, and she is no longer the little girl who hid behind her grandmother, afraid to speak. She now has her own ideas, goals, and a strong sense of self-discipline.',
					},
					{
						type: 'text',
						content:
							'Yanan has grown taller and more mature. She studies diligently, asks thoughtful questions when she doesn’t understand something, and learns with focus and confidence.',
					},

					{ type: 'subtitle', content: 'Looking Ahead' },
					{
						type: 'text',
						content:
							'I hope that both brother and sister continue to grow up healthy, carefree, and full of joy. I am certain that the next time I see Li Kang and Ge Yanan, I will be even more amazed — amazed by their growth, their progress, and the people they are becoming.',
					},
					{ type: 'image', src: imgKangbao20206, alt: 'growing up', caption: 'Kids are growing up!' },
				],
			},
			{
				id: 'pbic-2020-champions',
				title: 'We Are the Champions!',
				detailBlocks: [
					{ type: 'subtitle', content: 'The Moment We Won' },
					{
						type: 'text',
						content:
							'On August 15, 2020, the “Public Benefit International Challenge for Youth (PBIC 2020)” officially came to a close in Beijing. After more than four months of dedication and hard work — spanning the preliminary round, semifinals, finals, star ranking round, and the grand finale — the journey reached its peak.',
					},
					{
						type: 'text',
						content:
							'On the final stage, passionate young teams gave it their all and shone brightly. In the end, Little Green Leaves (Green Leaves Volunteers) claimed **first place**. Yes — **we are the champions!**',
					},
					{
						type: 'image',
						src: imgChampion1,
						alt: 'PBIC Champions',
						caption: 'Little Green Leaves — PBIC 2020 Champions!',
					},

					{ type: 'subtitle', content: 'A Decisive Victory' },
					{
						type: 'text',
						content:
							'We won with an absolute score advantage — a result that affirmed not only our project, but also the persistence, teamwork, and belief behind it.',
					},
					{ type: 'image', src: imgChampion2, alt: 'Winning moment', caption: 'The moment we won PBIC 2020!' },

					{ type: 'subtitle', content: 'The Team Behind the Win' },
					{
						type: 'text',
						content:
							'Although I was unable to attend the competition in person due to school commitments, Little Green Leaves never stopped working together. Even moments before stepping onto the final stage, we were still communicating, refining details, and preparing as a team.',
					},
					{
						type: 'text',
						content:
							'This victory belongs to the entire Little Green Leaves team — every moment of preparation, every discussion, and every challenge we faced together is reflected in this result.',
					},

					{ type: 'subtitle', content: 'Gratitude Above All' },
					{
						type: 'text',
						content:
							'Most importantly, I want to thank my two incredible teammates; my parents, who supported me wholeheartedly behind the scenes; and our dedicated mentors, Teacher Huang and Teacher Liu from Zebra Map, who continuously guided and challenged us.',
					},
					{ type: 'image', src: imgChampion3, alt: 'Team photo', caption: 'The team behind our PBIC 2020 victory.' },
					{
						type: 'text',
						content:
							'And to every supporter who has selflessly stood behind the Little Green Leaves mission — thank you. This championship belongs to all of you.',
					},
					{ type: 'image', src: imgChampion4, alt: 'medal' },
					{ type: 'image', src: imgChampion5, alt: 'certificate' },

					{ type: 'subtitle', content: 'About PBIC' },
					{
						type: 'text',
						content:
							'The Public Benefit International Challenge for Youth (PBIC) was jointly initiated in 2017 by the China-Africa Business Council and the China Social Assistance Foundation, with guidance and support from United Nations agencies and the Organization of African First Ladies for Development.',
					},
					{
						type: 'text',
						content:
							'Grounded in the United Nations Sustainable Development Goals (SDGs), PBIC has attracted over 800 students from more than 130 schools worldwide across its first three editions, reaching an audience of nearly one million.',
					},
					{
						type: 'text',
						content:
							'Participating teams receive official certificates from the PBIC Organizing Committee. Finalist teams are awarded jointly signed certificates and medals by UN representatives in China, professors from leading U.S. universities, and leaders of China’s top public welfare foundations. Outstanding teams may also receive special awards such as Project Design, Advocacy & Communication, and Campus Pioneer honors.',
					},
				],
			},
		],
		icon: Leaf,
	},
	{
		year: 2021,
		title: 'Going deeper and further',
		summary: 'Turning point for Green Leaves; The start of financial support program!',
		events: [
			{
				id: 'care-from-the-heart-online-sharing',
				title: 'Nurturing Growth, Starting from the Heart',
				detailBlocks: [
					{ type: 'subtitle', content: 'Care That Goes Beyond Material Support' },
					{
						type: 'text',
						content:
							'Every holiday, Little Green Leaves organizes visits to Zhangjiakou’s Kangbao County to spend time with the children. Through long-term companionship, we have come to understand that what they need is not only material support, but also emotional care, inner motivation, and guidance for learning and growth.',
					},

					{ type: 'subtitle', content: 'Turning Distance into Connection' },
					{
						type: 'text',
						content:
							'This year, due to the pandemic, we were unable to visit in person during the Christmas holiday. Instead of pausing, Little Green Leaves found a new way forward — we decided to connect with the children online and invite our members to share their own experiences.',
					},
					{
						type: 'text',
						content:
							'This led to our first online sharing program, “Starting from the Heart, Building Dreams Together.” Three Little Green Leaves members prepared carefully — creating presentations and rehearsing in advance. As our first attempt, there were moments of technical lag and classroom management challenges, but it was a meaningful and successful experience.',
					},

					{ type: 'subtitle', content: 'Meet the Speakers' },
					{
						type: 'text',
						content: '✨ Little Green Leaves members took the stage — shining with sincerity and passion.',
					},

					{ type: 'subtitle', content: 'Yuling Li' },
					{
						type: 'text',
						content:
							'Yuling Li, the top scorer of the 2019 Shenzhen High School Entrance Examination and a championship teammate from the PBIC competition, shared her study methods and time management strategies. She offered practical tips for different subjects, helping students build effective and sustainable learning habits.',
					},
					{ type: 'image', src: imgClass1, alt: 'Yuling Li' },
					{ type: 'image', src: imgClass2, alt: 'Yuling Li teaching' },

					{ type: 'subtitle', content: 'Leshan Li' },
					{
						type: 'text',
						content:
							'Leshan Li, a positive and inspiring friend whom Little Green Leaves met through the “Gift of Nature” platform, is currently a first-year student at the University of Glasgow. He shared his understanding of dreams — how to discover them, pursue them step by step, and maintain a positive mindset in daily life.',
					},
					{ type: 'image', src: imgClass3, alt: 'Leshan Li' },

					{ type: 'subtitle', content: 'Andrew Wang (Yanjie Wang)' },
					{
						type: 'text',
						content:
							'Andrew Wang, a high school student at Western Christian High School in the United States, spoke about the importance of speaking up when facing disrespect, building confidence, and forming strong relationships with teachers. He also shared lessons learned during the pandemic, including using study plans and schedules to stay focused, as well as reflections from his journey back home.',
					},
					{ type: 'image', src: imgClass4, alt: 'Andrew Wang' },

					{ type: 'subtitle', content: 'A New Year, A New Beginning' },
					{
						type: 'text',
						content:
							'From January 3 to January 11, we successfully held three online sharing sessions within one week. Students and parents from three primary schools in Kangbao County — Beiguan Primary School, Dongguan Primary School, and Dengyoufang Primary School — participated, with over 200 upper-grade students in attendance.',
					},
					{
						type: 'text',
						content:
							'We sincerely thank the school leaders of all three schools for providing this opportunity, and we are deeply grateful to the three Little Green Leaves volunteers for their heartfelt contributions.',
					},

					{ type: 'subtitle', content: 'Growing Together' },
					{
						type: 'text',
						content:
							'We believe the students gained something valuable — whether new dreams, effective study methods, or the courage to face new environments and challenges. Little Green Leaves volunteers will continue to walk alongside them, growing and striving forward together.',
					},
				],
			},
			{
				id: 'laba-festival-warmth-africa',
				title: 'Sharing Warmth on Laba Festival',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Bowl of Warmth in a Cold Winter' },
					{
						type: 'text',
						content:
							'In this cold winter, a single bowl of hot, fragrant Laba porridge may represent an entire day’s living cost for a child in an African orphanage.',
					},
					{ type: 'image', src: imgLaba1, alt: 'Laba Festival Warmth' },
					{ type: 'subtitle', content: 'A Crisis Upon Crisis' },
					{
						type: 'text',
						content:
							'In early 2020, East Africa suffered the most severe locust outbreak in decades, causing massive crop losses. Almost simultaneously, COVID-19 spread across the world. The prolonged pandemic led to food shortages and rising prices, making life increasingly difficult for children at the Garden of Hope Orphanage, located in Kenya’s third-largest informal settlement.',
					},
					{
						type: 'text',
						content:
							'For these children, going hungry became part of daily life. Three and a half RMB — roughly the cost of a bowl of Laba porridge — is the daily food budget for one Kenyan child.',
					},
					{
						type: 'text',
						content:
							'In response, Zebra Map partnered with DBSA Dream Builders and an overseas donation-qualified foundation to launch the “Zero Hunger Action,” aiming to raise six months’ worth of food supplies for 100 children at the Garden of Hope Orphanage.',
					},
					{ type: 'image', src: imgLaba2, alt: 'Laba Festival Warmth' },
					{ type: 'subtitle', content: 'A Place I Will Never Forget' },
					{
						type: 'text',
						content:
							'This is a place I can never forget — home to a group of truly remarkable children. In 2019, I came to the Garden of Hope Orphanage as an international volunteer, known as a “Non-Flyer.” I met over 100 resident children with no homes, as well as more than 100 day students from families facing extreme hardship.',
					},
					{
						type: 'text',
						content: 'Their world was confined to this small compound.',
					},

					{ type: 'subtitle', content: 'Hardship and Hope' },
					{
						type: 'text',
						content:
							'During the days I spent with them, I experienced their difficult living conditions firsthand. Their meals consisted only of beans, and their daily water was cloudy and yellow. Yet alongside these hardships, I also saw their optimism, resilience, and deep love for learning and reading.',
					},

					{ type: 'subtitle', content: 'A Window to the World' },
					{
						type: 'text',
						content:
							'Little Green Leaves established a Chinese-language reading corner at the Garden of Hope Orphanage, hoping this small window could help the children better understand China and glimpse the wider world beyond.',
					},
					{ type: 'image', src: imgLaba3, alt: 'Laba Festival Warmth' },
					{
						type: 'text',
						content:
							'In the summer of 2020, the Little Green Leaves team participated in the African Care track of the Youth Social Innovation International Challenge. Through this project, we supported female students at African orphanages by offering regular training programs to broaden their perspectives and build practical skills — empowering them to strengthen their abilities and challenge the harm caused by gender inequality.',
					},

					{ type: 'subtitle', content: 'Standing Together in Difficult Times' },
					{
						type: 'text',
						content:
							'Today, Little Green Leaves hopes to contribute our own small strength. Together with Zebra Map, we stand with these innocent children — who have no ability to protect themselves — during this exceptionally difficult time, helping them meet their most basic needs for survival.',
					},

					{ type: 'image', src: imgLaba4, alt: 'Laba Festival Warmth' },
				],
			},
			{
				id: 'women-day-mom',
				title: "Happy Women' Day — To My “Goddess” Mom",
				detailBlocks: [
					{ type: 'subtitle', content: 'A Special Day of Gratitude' },
					{
						type: 'text',
						content:
							'Today is March 8, 2021 — the 111th International Women’s Day and the 98th Women’s Day celebrated in China, affectionately known as “Goddess Day.” On this special day, I wish a happy holiday to my forever-young goddess — my mom — and to all the goddesses around the world.',
					},
					{ type: 'image', src: imgMom1, alt: 'Mom' },

					{ type: 'subtitle', content: 'A Movie, A Memory' },
					{
						type: 'text',
						content:
							'A few days ago, my parents and I watched the late-night screening of the film “Hi, Mom.” When the truth behind the mother-daughter time travel was revealed at the end, the face of Li Huanying on the screen suddenly blurred into my mother’s face. In that moment, scenes of my life with her flashed before my eyes like a revolving lantern.',
					},
					{
						type: 'text',
						content:
							'In past years, Goddess Day often slipped by unnoticed — buried under academic pressure or youthful distractions. But this year, I wanted to truly pause and thank my mom — the eternal goddess in my heart.',
					},

					{ type: 'subtitle', content: 'My Everyday Goddess' },
					{
						type: 'text',
						content:
							'As a goddess, my mom’s cooking is, of course, always delicious. As a goddess, her care for me has never once been lacking. And as a goddess, she always finds unexpected angles from which to offer her “constructive criticism.”',
					},
					{
						type: 'text',
						content:
							'When I was younger, I both loved and resented this goddess — loving her care, resenting her strictness. Over time, especially after studying abroad, I came to understand that behind her stern words were deep love and high hopes for me.',
					},

					{ type: 'subtitle', content: 'Growing Closer with Time' },
					{
						type: 'text',
						content:
							'Now, my goddess and I are closer than ever. When we have time, we chat, play chess, work out together, and even explore cooking ideas side by side. Some emotions are beyond words — and all of them come together in one big hug.',
					},

					{ type: 'subtitle', content: 'A Wish from the Heart' },
					{
						type: 'text',
						content:
							'Wishing my goddess eternal youth — forever eighteen at heart. And wishing happiness and joy to every goddess in the world.',
					},
					{ type: 'image', src: imgMom2, alt: 'Mom' },
				],
			},
			{
				id: 'dream-platform-launch',
				title: 'Setting Sail — The Little Green Leaves Dream Platform',
				detailBlocks: [
					{ type: 'subtitle', content: 'Spring, Growth, and New Beginnings' },
					{
						type: 'text',
						content:
							'Spring belongs to green leaves — it is a season of growth and a season of dreams. Time has passed quickly, and in the blink of an eye, the Little Green Leaves Volunteers Alliance has completed its fifth year.',
					},
					{
						type: 'text',
						content:
							'In the spring of 2021, the Little Green Leaves Dream Platform officially set sail once again — committed to offering children in need broader horizons, warm support, and real pathways toward their dreams.',
					},

					{ type: 'subtitle', content: 'From Action to Deeper Understanding' },
					{
						type: 'text',
						content:
							'Over these five years, I gradually came to realize that children need more than material assistance alone. What they need just as urgently is psychological support, emotional care, and guidance for personal growth.',
					},
					{
						type: 'text',
						content:
							'This realization led to the creation of the Little Green Leaves Dream Platform — a third-party bridge connecting disadvantaged students, left-behind children, and orphans with individuals who wish to help them build their dreams.',
					},

					{ type: 'subtitle', content: 'One-to-One Material Support' },
					{
						type: 'text',
						content:
							'All educational sponsorship funds are transferred directly from the dream sponsor to the student or the student’s guardian. No third parties, institutions, or schools are involved in handling donations.',
					},
					{
						type: 'text',
						content:
							'The platform’s sole role is to build a transparent communication bridge between caring sponsors and students in need — ensuring trust, efficiency, and respect.',
					},

					{ type: 'subtitle', content: 'One-to-One and One-to-Many Emotional Support' },
					{
						type: 'text',
						content:
							'Outstanding high school and university students serve as long-term mentors, offering free academic guidance, life advice, and emotional companionship.',
					},
					{
						type: 'text',
						content:
							'Mentors also support students’ personal interests — such as art, music, and other talents — helping them discover confidence and pursue their dreams.',
					},

					{ type: 'subtitle', content: 'Our Dream-Building Philosophy' },
					{
						type: 'text',
						content:
							'Our mission is to help students break free from poverty both materially and spiritually — to learn how to change their own futures, cultivate gratitude, embrace service, and develop a positive, hopeful outlook on life.',
					},
					{
						type: 'text',
						content: 'This is the true meaning of “dream-building,” and the purpose that guides everything we do.',
					},
					{ type: 'image', src: imgDream1, alt: 'Dream Platform' },

					{ type: 'subtitle', content: 'Transparency and Trust' },
					{
						type: 'text',
						content:
							'Authentic and transparent student information forms the foundation of the Dream Platform. All student profiles are carefully verified through the Kangbao County Women’s Federation, local government offices, and schools.',
					},
					{
						type: 'text',
						content:
							'We openly share verified family conditions, contact information for parents and teachers, student and household survey photos, and the contact details of investigators and follow-up volunteers. We welcome public supervision and invite sponsors and community members to conduct on-site visits.',
					},
					{
						type: 'text',
						content:
							'The platform’s processes and policies are fully disclosed, and we welcome inquiries and oversight from all sectors of society.',
					},

					{ type: 'subtitle', content: 'Long-Term Commitment' },
					{
						type: 'text',
						content:
							'Continuous follow-up and long-term companionship are core features of the Little Green Leaves Dream Platform. Students whose sponsorship is interrupted will be promptly re-matched with new sponsors.',
					},
					{
						type: 'text',
						content:
							'If a student’s family conditions improve significantly, or if a student demonstrates persistent lack of engagement or leaves school, sponsors will be advised to conclude support responsibly.',
					},
					{
						type: 'text',
						content:
							'Through ongoing emotional guidance, we aim to plant seeds of compassion, nurture healthy values, and help children learn not only how to receive love — but also how to pass it on.',
					},

					{ type: 'subtitle', content: 'A Shared Wish' },
					{
						type: 'text',
						content:
							'May your kindness be like the spring breeze of March, spreading warmth across the land. May our shared goodwill be like fresh green leaves, growing stronger under the sun.',
					},
					{
						type: 'text',
						content:
							'May we walk the dream-building journey together. From little green leaves to a forest — with gratitude for every one of you.',
					},
					{ type: 'image', src: imgDream2, alt: 'Dream Platform' },
				],
			},
			{
				id: 'dream-platform-first-milestone',
				title: 'Dreams in Motion — The Journey Has Begun',
				detailBlocks: [
					{ type: 'subtitle', content: 'Helping Children, Impacting Families' },
					{
						type: 'text',
						content:
							'By helping one child, we influence an entire family. By nurturing dreams, we change the future. As long as we keep moving forward with persistence and effort, results will follow.',
					},

					{ type: 'subtitle', content: 'The First Milestone' },
					{
						type: 'text',
						content:
							'The Little Green Leaves Dream Platform proudly completed its first major milestone: the first group of ten sponsored students has successfully found their destined dream sponsors.',
					},

					{ type: 'subtitle', content: 'Our Dream Sponsors' },
					{
						type: 'text',
						content:
							'These caring individuals and organizations stepped forward as “Dream Builders,” forming one-to-one connections with the children they support:',
					},
					{
						type: 'text',
						content:
							'- Guotai Junan Securities, Beijing Tongzhou Branch — sponsors Wenxinrui and Cao Shuran\n' +
							'- Beijing Lexiang Jianing Education Technology Co., Ltd. — Principal Yin Zihan sponsoring Yin Aoyu\n' +
							'- Wanshang Chuangfugang Co., Ltd., Marketing Director Wang Qiong — sponsoring Liu Jia\n' +
							'- Beijing Growth Garden, Li Lijuan — sponsoring Liu Dandan\n' +
							'- Agricultural Bank of China, Langfang Branch, Mr. Wang — sponsoring Wang Ruixiang\n' +
							'- Agricultural Bank of China, Langfang Branch, Ms. Sun — sponsoring Li Xuan\n' +
							'- Hebei PetroChina Central Hospital, Health Department, Geng Zhiqing — sponsoring Huo Yingjie\n' +
							'- Bank of China, Yanjiao Branch, Ms. Liu — sponsoring Hao Zhengxuan\n' +
							'- Bank of China, Yanjiao Branch, Mr. Wang — sponsoring Geng Jiaxin',
					},

					{ type: 'subtitle', content: 'Delivering Love with Care' },
					{
						type: 'text',
						content:
							'We believe that sponsorship funds should be delivered directly to the hands of the students, allowing them to truly feel the warmth and care of society. However, since many recipients are left-behind children — some still in kindergarten — their grandparents are often unfamiliar with digital payment tools.',
					},
					{ type: 'image', src: imgDream3, alt: 'Dream Platform Milestone' },
					{
						type: 'text',
						content:
							'After discussions with Deputy Mayor Liu Yanfeng of Kangbao Town, we coordinated with village Party secretaries to assist in fund transfers. This led to the creation of the “Dream Builder Group,” where the Kangbao County Women’s Federation Chair, the town’s deputy mayor, and village leaders joined sponsors to witness and support each child’s dream-building journey together.',
					},

					{ type: 'subtitle', content: 'The Results of Persistence' },
					{
						type: 'text',
						content:
							'This milestone is a tangible result of staying true to our beliefs and taking steady action. It marks the beginning of a sustainable and transparent path forward.',
					},
					{ type: 'image', src: imgDream4, alt: 'Dream Platform Milestone' },
					{ type: 'image', src: imgDream5, alt: 'Dream Platform Milestone' },
					{ type: 'image', src: imgDream6, alt: 'Dream Platform Milestone' },
					{ type: 'image', src: imgDream7, alt: 'Dream Platform Milestone' },

					{ type: 'subtitle', content: 'Our Guiding Philosophy' },
					{
						type: 'text',
						content:
							'Our mission is to help students move away from poverty both materially and spiritually — to learn how to change their own destinies, cultivate gratitude, embrace service, and develop positive, hopeful values toward life.',
					},
					{
						type: 'text',
						content: 'This is our dream-building philosophy, and it is the goal that guides every step we take.',
					},

					{ type: 'subtitle', content: 'Gratitude and Trust' },
					{
						type: 'text',
						content:
							'We extend our deepest thanks to every dream sponsor. Among them are family members, friends, people we know but have never met in person, and many kind supporters we had never known before. Thank you for choosing to trust Little Green Leaves.',
					},
					{
						type: 'text',
						content:
							'As a high school student, I often ask myself how I am worthy of such recognition and encouragement. I believe the answer lies in the power of shared energy and collective belief.',
					},
					{
						type: 'text',
						content:
							'We also sincerely thank the leaders at all levels in Kangbao County for their support. It is your trust that gives Little Green Leaves the courage to keep dreaming, and the confidence to continue moving forward with warmth and hope.',
					},

					{ type: 'subtitle', content: 'Walking the Dream Path Together' },
					{
						type: 'text',
						content:
							'We look forward to welcoming more caring individuals to join us on this meaningful journey — to experience the beauty of building dreams together.',
					},
				],
			},
			{
				id: 'centennial-tribute-dream-platform',
				title: 'A Centennial Tribute — Little Green Leaves Dream Platform in Action',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Tribute to a Century' },
					{
						type: 'text',
						content:
							'In celebration of a hundred years, Little Green Leaves continues its dream-building journey. Helping one child can influence an entire family; nurturing dreams can change the future.',
					},
					{
						type: 'text',
						content: 'As long as we persist, we remain on the path. As long as we work hard, results will follow.',
					},

					{ type: 'subtitle', content: 'A Remarkable Milestone' },
					{
						type: 'text',
						content:
							'Within just three months, the Little Green Leaves Dream Platform successfully supported two groups of students, helping **17 left-behind children** find their destined dream sponsors.',
					},
					{
						type: 'text',
						content:
							'These 17 sponsors represent 17 caring families. Their generosity will influence — and perhaps change — the futures of 17 young dreamers. We extend our heartfelt gratitude to every sponsor for their selfless dedication.',
					},

					{ type: 'subtitle', content: 'The Second Group of Dream Builders' },
					{
						type: 'text',
						content:
							'Today, we are honored to introduce the second group of seven sponsored students and their dream builders. Among these sponsors are company managers, village leaders, graduate students, high school students, and even middle school students. Some are based in China, others overseas.',
					},
					{ type: 'image', src: imgCentennial1, alt: 'Dream Platform Centennial Tribute' },
					{
						type: 'text',
						content:
							'Regardless of age, profession, or location, they all share one thing — a heart filled with compassion. We believe their love will nourish the hearts of every supported child.',
					},

					{ type: 'subtitle', content: 'Our Dream Builders' },
					{
						type: 'text',
						content:
							'- Zhao Jinsong, Dashigezhuang Village, Yanjiao Town, Sanhe City — sponsoring Li Haoyu\n' +
							'- Zhao Qianxi, Shijiazhuang No. 2 Experimental School — sponsoring Cui Shihan\n' +
							'- Yu Yinuo, Ciqu Middle School, Tongzhou District, Beijing — sponsoring Gu Jianshu\n' +
							'- Zhang Dongli, Youyike Intelligent Systems Engineering Co., Ltd., Sanhe City — sponsoring Lei Guopeng\n' +
							'- Chen Shaomin, Master’s Student, Monash University, Australia — sponsoring Wu Hao\n' +
							'- Liu Yinzhe, King’s Academy, Jordan — sponsoring Xin Shixuan\n' +
							'- Cheng Chujun and her father — sponsoring Wang Huiwen',
					},

					{ type: 'subtitle', content: 'Delivering Love with Integrity' },
					{
						type: 'text',
						content:
							'We believe that sponsorship funds should be delivered directly to the students so they can truly feel society’s warmth and care. However, many recipients are left-behind children — some still in kindergarten — and their grandparents are often unfamiliar with digital payment tools.',
					},
					{
						type: 'text',
						content:
							'After consultation with Deputy Mayor Liu Yanfeng of Kangbao Town, village Party secretaries assisted sponsors in completing the transfers. This led to the formation of the “Dream Builder Group,” where the Chair of the Kangbao County Women’s Federation, the town’s deputy mayor, and village leaders joined sponsors to witness and support each child’s dream journey together.',
					},

					{ type: 'subtitle', content: 'Dreams Becoming Reality' },
					{
						type: 'text',
						content:
							'Across multiple villages, dream funds were personally delivered to students with care and respect — sometimes by village leaders, sometimes by sponsors themselves traveling long distances to visit the children and their families.',
					},
					{ type: 'image', src: imgCentennial2, alt: 'Dream Platform Centennial Tribute' },
					{ type: 'image', src: imgCentennial3, alt: 'Dream Platform Centennial Tribute' },

					{ type: 'subtitle', content: 'Our Guiding Philosophy' },
					{
						type: 'text',
						content:
							'Our mission is to help students escape poverty both materially and spiritually — to learn how to change their destinies, cultivate gratitude, embrace service, and develop a positive, hopeful outlook on life.',
					},
					{
						type: 'text',
						content: 'This is our dream-building philosophy, and it is the goal that guides everything we do.',
					},

					{ type: 'subtitle', content: 'Gratitude and Faith' },
					{
						type: 'text',
						content:
							'We thank every dream builder — among them family members, classmates, friends, people we know but have never met, and many kindhearted supporters we had never known before. Thank you for choosing to believe in Little Green Leaves.',
					},
					{
						type: 'text',
						content:
							'As a high school student, I often ask myself how I am worthy of such trust and encouragement. I believe this is the power of shared conviction and collective energy.',
					},
					{
						type: 'text',
						content:
							'We also extend sincere thanks to leaders at all levels in Kangbao County. It is your support that gives Little Green Leaves the courage to keep dreaming and the confidence to continue moving forward with warmth and purpose.',
					},

					{ type: 'subtitle', content: 'A Centennial Promise' },
					{
						type: 'text',
						content:
							'We are deeply grateful to grow up in a strong nation and live in such a hopeful era. At this historic centennial moment, all dream builders and Little Green Leaves come together to offer our tribute in our own way.',
					},
					{
						type: 'text',
						content:
							'May our country prosper and flourish. From little green leaves to a forest — thank you for walking this dream-building journey with us.',
					},
				],
			},
			{
				id: 'dream-journey-kangbao',
				title: 'Dream Journey to Kangbao',
				detailBlocks: [
					{ type: 'subtitle', content: 'Returning North, Returning Home' },
					{
						type: 'text',
						content:
							'After one year, the Little Green Leaves Dream Platform team once again traveled north on the “Dream Journey to Kangbao.” Passing familiar road signs and fields of blooming canola flowers, we could hardly contain our excitement — it truly felt like coming home.',
					},
					{ type: 'image', src: imgKangbao20211, alt: 'Dream Journey to Kangbao' },

					{ type: 'subtitle', content: 'A Platform Built on Commitment' },
					{
						type: 'text',
						content:
							'Within just three months, the Little Green Leaves Dream Platform successfully connected **19 underprivileged left-behind children** with one-on-one dream-building families.',
					},
					{
						type: 'text',
						content:
							'Staying true to our founding philosophy, we strive to help children escape poverty both materially and emotionally, develop positive values, and achieve meaningful, long-term growth. The second round of sponsorship funds has now been fully delivered to all supported children.',
					},
					{ type: 'image', src: imgKangbao20212, alt: 'Dream Journey to Kangbao' },
					{ type: 'subtitle', content: 'Meeting the Children Face to Face' },
					{
						type: 'text',
						content:
							'Meeting the supported children in person for the first time was deeply moving. They came from single-parent families, some were orphans, some had just entered kindergarten, while others had recently completed middle school.',
					},
					{ type: 'image', src: imgKangbao20213, alt: 'Dream Journey to Kangbao' },
					{
						type: 'text',
						content:
							'On the surface, their family circumstances may seem unfortunate. Yet under China’s nationwide poverty alleviation efforts, they are also incredibly fortunate — receiving care and attention from county, town, and village governments, as well as love from their one-on-one dream families. Little Green Leaves is genuinely happy for them.',
					},

					{ type: 'subtitle', content: 'Encouragement and Shared Dreams' },
					{
						type: 'text',
						content:
							'Leaders from the Kangbao County Women’s Federation, Kangbao Town Party Committee, and village officials offered strong encouragement and support. We were honored to share with the children how learning can change destiny, how education opens the path to opportunity, and how dreams give life direction.',
					},
					{ type: 'image', src: imgKangbao20214, alt: 'Dream Journey to Kangbao' },
					{
						type: 'text',
						content:
							'The students listened attentively, nodding with bright, hopeful eyes. Many expressed their determination to study hard and one day give back to society. The Dream Platform team also prepared thoughtful gifts, bringing genuine joy to the children.',
					},

					{ type: 'subtitle', content: 'A Bridge of Warmth' },
					{
						type: 'text',
						content:
							'As the event concluded, parents were reluctant to leave. They had many questions, many stories, and countless words of gratitude. In truth, Little Green Leaves did not do anything extraordinary — the Dream Platform is simply a bridge of warmth and a channel for love.',
					},
					{ type: 'image', src: imgKangbao20215, alt: 'Dream Journey to Kangbao' },
					{
						type: 'text',
						content:
							'The deepest gratitude belongs to every dream builder and their families. It is their trust and support that made this Dream Journey to Kangbao possible. It is their generosity that allows Little Green Leaves to move forward with confidence and compassion.',
					},

					{ type: 'subtitle', content: 'Gratitude and a Promise Forward' },
					{
						type: 'text',
						content:
							'We sincerely thank every supporter who has encouraged Little Green Leaves — you give us confidence. We thank leaders at all levels who have supported us — you give us courage. We thank every supported child and family — you allow us to plant seeds of hope.',
					},
					{
						type: 'text',
						content:
							'May all children transform the care of the Party, the government, and society into motivation for learning; face life’s challenges with optimism; enrich themselves through knowledge; and repay society through action.',
					},
					{
						type: 'text',
						content: 'Whenever you need support, the Little Green Leaves Dream Platform will always be on the road.',
					},
				],
			},
		],
		icon: HandCoins,
	},

	{
		year: 2022,
		title: 'Branching Out',
		summary: 'Staying on our journey to a better world.',
		events: [
			{
				id: 'gratitude-and-blessings-anniversary',
				title: 'Gratitude & Blessings — A New Year Reflection',
				detailBlocks: [
					{ type: 'subtitle', content: 'A New Beginning' },
					{
						type: 'text',
						content: 'The New Year marks a beginning — a moment filled with joyful melodies and warm memories.',
					},

					{ type: 'subtitle', content: 'Three Years of Growth' },
					{
						type: 'text',
						content:
							'Three years ago today, the Little Green Leaves public account was officially launched. In the blink of an eye, it has now reached its third anniversary.',
					},
					{
						type: 'text',
						content:
							'Three years may not be long, and there is still much room for growth, but it has been a journey filled with dedication, effort, joy, and gratitude.',
					},

					{ type: 'subtitle', content: 'What We Have Accomplished Together' },
					{
						type: 'text',
						content:
							'As of today, the Little Green Leaves public account has:\n\n' +
							'- Over **600 followers**\n' +
							'- **62 published articles**\n' +
							'- **320,278 total reads**\n' +
							'- **17 rewarded articles**, raising **30,198 RMB**, all donated to African orphanages',
					},
					{
						type: 'text',
						content:
							'Through this platform, Little Green Leaves has documented and shared **six years of growth**. With the support of countless caring individuals, we have collected over **30,000 books** and more than **1,000 pieces of clothing**, supporting **six schools and two orphanages**, building **three libraries and 46 reading corners**.',
					},

					{ type: 'subtitle', content: 'Continuing Forward, Even in Uncertain Times' },
					{
						type: 'text',
						content:
							'Even during the challenges of the 2020 pandemic, our efforts never stopped. By participating in international competitions, we successfully raised **86,868 RMB** to support African orphanages.',
					},
					{
						type: 'text',
						content:
							'In 2021, we launched the **Little Green Leaves Dream Platform**, sharing learning strategies, addressing psychological concerns, and inspiring young students through stories of perseverance and hope. Through this platform, more than **20 left-behind children** from underprivileged backgrounds were matched with one-on-one dream-building families.',
					},

					{ type: 'subtitle', content: 'Beyond the Numbers' },
					{
						type: 'text',
						content:
							'These numbers may appear ordinary at first glance, but we understand their true weight and the effort behind them.',
					},
					{
						type: 'text',
						content:
							'To us, they represent the gathering of kindness, the trust reflected in supportive eyes, the strength of encouragement, and the selfless contributions of countless individuals. Together, they form moments of warmth, gratitude, and profound inspiration.',
					},

					{ type: 'subtitle', content: 'A Heartfelt Thank You' },
					{
						type: 'text',
						content:
							'Today, Little Green Leaves celebrates its third anniversary. With deep gratitude and heartfelt blessings, we thank every supporter who has walked alongside us.',
					},
					{
						type: 'text',
						content:
							'As the final glow of the sunset marks the close of 2021, it carries with it our sincerest appreciation for your trust and unwavering support.',
					},

					{ type: 'subtitle', content: 'Looking Toward the New Year' },
					{
						type: 'text',
						content:
							'As the first light of dawn ushers in 2022, it brings our warmest wishes to you — may you enjoy health, happiness, and a confident new beginning.',
					},
					{
						type: 'text',
						content:
							'May the Year of the Tiger bring you strength, courage, and prosperity. May every dream find its momentum, and every effort bear fruit.',
					},

					{ type: 'subtitle', content: 'New Year Wishes' },
					{
						type: 'text',
						content:
							'Wishing everyone a joyful New Year.\n\nWishing Little Green Leaves a year of strength, momentum, and fulfilled dreams — from little green leaves to a thriving forest.',
					},
					{ type: 'image', src: imgReflection1, alt: 'Little Green Leaves 3rd Anniversary' },
				],
			},
			{
				id: 'a-special-gift-youth-day',
				title: 'A Special Gift — Youth Day Reflections',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Meaningful Day' },
					{
						type: 'text',
						content: '“From little green leaves to a forest — thank you for being with us.”',
					},
					{
						type: 'text',
						content:
							'Today is a special day — Youth Day (May Fourth). It is a celebration of young people, and also a moment I wanted to mark with deeper meaning.',
					},

					{ type: 'subtitle', content: 'A Gift to Myself' },
					{
						type: 'text',
						content:
							'With the intense college application season finally behind me and admission offers received from universities I am truly grateful for, my four years of high school have come to a close.',
					},
					{
						type: 'text',
						content:
							'After months of focus on applications, the Little Green Leaves public account had been quiet. This felt like the perfect moment to reflect on what the Little Green Leaves Dream Platform has accomplished this year — as a special gift to myself.',
					},

					{ type: 'subtitle', content: 'What We Achieved Together in 2022' },
					{
						type: 'text',
						content:
							'In January 2022, we successfully matched **two students** with caring dream-building families. After the Spring Festival, **seven more sponsors** joined the Little Green Leaves Dream Team.',
					},
					{
						type: 'text',
						content: 'As of today, **nine additional left-behind children** have received one-on-one support in 2022.',
					},
					{
						type: 'text',
						content:
							'From 2021 to now — just over one year — we have helped **29 left-behind children** find their dedicated dream families.',
					},

					{ type: 'subtitle', content: '29 Families, 29 Futures' },
					{
						type: 'text',
						content:
							'The Dream Platform began with just one person and has gradually grown into a dedicated team. These **29 dream builders represent 29 caring families**.',
					},
					{
						type: 'text',
						content:
							'Their love and commitment will influence the futures of 29 young dreamers — and may even change the trajectory of 29 families.',
					},

					{ type: 'subtitle', content: 'Quiet Acts of Great Love' },
					{
						type: 'text',
						content:
							'While we may not be able to help everyone, every dream builder gives with sincerity. Beyond regular sponsorship funds, some buy new clothes, send learning supplies, make frequent phone calls, and offer steady companionship.',
					},
					{
						type: 'text',
						content:
							'Many of them contribute quietly, asking that their names never be mentioned. For this selfless dedication, we extend our deepest gratitude.',
					},

					{ type: 'subtitle', content: 'One Name, One Heart' },
					{
						type: 'text',
						content:
							'Among the 29 dream builders are managers, school principals, lawyers, village leaders, fitness coaches, graduate students, high school students, and middle school students.',
					},
					{
						type: 'text',
						content:
							'Some are based in China, others overseas. Regardless of age, profession, or location, they share one name — **Dream Builders** — and one common trait: a heart filled with compassion.',
					},

					{ type: 'subtitle', content: 'A Journey Witnessed Together' },
					{
						type: 'text',
						content:
							'The “Dream Builder Group” includes not only sponsors, but also the Chair of the Kangbao County Women’s Federation, the Deputy Mayor of Kangbao Town, and village leaders of the supported children.',
					},
					{ type: 'image', src: imgGift1, alt: 'Dream Platform Youth Day' },
					{ type: 'image', src: imgGift2, alt: 'Dream Platform Youth Day' },
					{
						type: 'text',
						content: 'Together, everyone witnesses and supports each step of this meaningful dream-building journey.',
					},

					{ type: 'subtitle', content: 'Our Dream-Building Philosophy' },
					{
						type: 'text',
						content:
							'Our goal is to help students escape poverty both materially and spiritually — to learn how to change their destiny, cultivate gratitude, embrace service, and build positive, hopeful values.',
					},
					{
						type: 'text',
						content:
							'This is the philosophy behind our dream-building work, and it remains the purpose that guides us forward.',
					},

					{ type: 'subtitle', content: 'Gratitude Beyond Words' },
					{
						type: 'text',
						content:
							'My heartfelt thanks go to every dream builder — family members, classmates, friends, people I know but have never met, and kind supporters I may never personally know.',
					},
					{
						type: 'text',
						content:
							'Thank you for choosing to believe in Little Green Leaves. As a high school student, I see this as a powerful exchange of trust, energy, and shared belief.',
					},
					{
						type: 'text',
						content:
							'I also sincerely thank leaders at all levels in Kangbao County. Your support gives Little Green Leaves the courage to keep moving forward, and the confidence to continue warming hearts along the way.',
					},

					{ type: 'subtitle', content: 'The Most Meaningful Gift' },
					{
						type: 'text',
						content: 'Thank you to every dream builder for this truly special Youth Day gift.',
					},
				],
			},
			{
				id: 'dream-journey-continues-2022',
				title: 'Dream Journey — Still on the Road',
				detailBlocks: [
					{ type: 'subtitle', content: 'Still Moving Forward' },
					{
						type: 'text',
						content: 'From little green leaves to a forest — thank you for walking with us.',
					},
					{
						type: 'text',
						content:
							'Holidays always feel short. Yet within this brief break, I experienced moments of surprise, gratitude, and deep emotional connection.',
					},

					{ type: 'subtitle', content: 'A Summer of Separation and Connection' },
					{
						type: 'text',
						content:
							'Due to visa application requirements, I was only able to return to China on July 15. After completing quarantine, the start of university was already approaching.',
					},
					{
						type: 'text',
						content:
							'Unfortunately, this meant I could not travel to Kangbao as I had in previous years to personally visit the children supported by the Little Green Leaves Dream Platform. While this brought regret, it also led to unexpected moments of warmth and inspiration.',
					},

					{ type: 'subtitle', content: 'Love That Never Stops Moving' },
					{
						type: 'text',
						content:
							'As the first half of the 2022 Dream Journey came to a successful close, dozens of dream builders continued to offer care and generosity. Like a clear, refreshing spring flowing through the height of summer, their love crossed mountains and rivers from all corners of the country, once again reaching the children.',
					},

					{ type: 'subtitle', content: 'Delivering Warmth, Even Under the Summer Sun' },
					{
						type: 'text',
						content:
							'Despite the intense summer heat, local village officials and leaders ensured that dream funds were delivered to the children as soon as they were received. Their dedication ensured that every act of kindness reached the children without delay.',
					},

					{ type: 'subtitle', content: 'Growing Impact, Quiet Devotion' },
					{
						type: 'text',
						content:
							'To date, the Little Green Leaves Dream Program has supported **more than 30 underprivileged children**.',
					},
					{
						type: 'text',
						content:
							'While we may not be able to help everyone, every dream builder gives with intention and sincerity. Beyond regular sponsorship funds, some provide new clothes, mail school supplies, or stay connected through frequent phone calls.',
					},
					{
						type: 'text',
						content:
							'They give quietly, often asking that their names not be mentioned. For this selfless dedication, we offer our most heartfelt gratitude.',
					},
					{ type: 'image', src: imgDream20221, alt: 'Dream Journey 2022' },
					{ type: 'image', src: imgDream20222, alt: 'Dream Journey 2022' },
					{ type: 'image', src: imgDream20223, alt: 'Dream Journey 2022' },

					{ type: 'subtitle', content: 'A Growing Family of Dream Builders' },
					{
						type: 'text',
						content: 'Recently, the Little Green Leaves Dream Builder family welcomed **three new members**.',
					},
					{
						type: 'text',
						content:
							'Thank you for choosing to believe in Little Green Leaves. And thank you to every dream builder for your continued generosity and commitment.',
					},

					{ type: 'subtitle', content: 'Strengthened by Support' },
					{
						type: 'text',
						content:
							'We extend our sincere appreciation to leaders at all levels in Kangbao County for their strong and consistent support.',
					},
					{
						type: 'text',
						content:
							'Your encouragement gives Little Green Leaves a confidence as powerful as the summer sun — and the courage to continue walking firmly on the dream-building path.',
					},

					{ type: 'subtitle', content: 'Always on the Road' },
					{
						type: 'text',
						content:
							'With gratitude in our hearts and faith in our steps, the Little Green Leaves Dream Platform remains on the road — moving forward, together.',
					},
				],
			},
			{
				id: 'gratitude-thanksgiving-reflection',
				title: 'With Gratitude — A Semester Reflection',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Moment to Pause and Reflect' },
					{
						type: 'text',
						content:
							'As the semester comes to an end and university life gradually settles into rhythm, the Thanksgiving break finally offered a quiet moment to reflect on the second half of the year for the Little Green Leaves Dream Platform.',
					},

					{ type: 'subtitle', content: 'Seven Years of Growth' },
					{
						type: 'text',
						content:
							'Since founding the Little Green Leaves Volunteer Alliance in 2016, seven years have passed. These seven years have witnessed my own journey — from middle school, to high school, and now university — growing alongside Little Green Leaves.',
					},
					{
						type: 'text',
						content:
							'Over time, Little Green Leaves has steadily grown: from collecting second-hand books to build reading corners in mountain schools, to donating clothing to families in need, and eventually, in 2021, launching the Little Green Leaves Dream Platform.',
					},

					{ type: 'subtitle', content: 'From One Book to a Forest' },
					{
						type: 'text',
						content:
							'From a single book to tens of thousands of books; from one reading corner to dozens; from one donated item of clothing to over a thousand; and from one dream-building family to more than thirty — every step forward has been made possible by the trust, encouragement, and support of countless caring individuals.',
					},
					{
						type: 'text',
						content:
							'It is because of you that Little Green Leaves has grown stronger, more confident, and continues to walk steadily on the path of dreams.',
					},

					{ type: 'subtitle', content: 'New Support, Continuing Commitment' },
					{
						type: 'text',
						content:
							'After completing the distribution of dream funds for the second half of 2022, three additional sponsors joined the Dream Platform beginning in September — one from Shaanxi Province and two from Shandong Province.',
					},
					{
						type: 'text',
						content:
							'Through their actions, they bring warmth to children with dreams and support to families facing hardship.',
					},
					{
						type: 'text',
						content: 'To date, **33 left-behind children** have been matched with one-on-one dream-building families.',
					},

					{ type: 'subtitle', content: 'Quiet Acts of Love' }, //13
					{
						type: 'text',
						content:
							'While we may not be able to help everyone, every dream builder gives with sincerity. Beyond regular sponsorship funds, some purchase new clothes, send school supplies, or stay connected through frequent phone calls.',
					},
					{
						type: 'text',
						content:
							'Many contribute quietly, asking that their names not be mentioned. For this selfless dedication, we extend our deepest gratitude.',
					},

					{ type: 'subtitle', content: 'Our Guiding Philosophy' }, //16
					{
						type: 'text',
						content:
							'Our mission is to help supported students escape poverty both materially and spiritually — to learn how to change their destinies, cultivate gratitude, embrace service, and develop positive, hopeful values.',
					},
					{
						type: 'text',
						content:
							'This is the philosophy behind our dream-building work, and it remains the goal that guides us forward.',
					},

					{ type: 'subtitle', content: 'From Children to Families, From Dreams to Futures' }, //19
					{
						type: 'text',
						content: 'Helping a child can influence an entire family. Supporting growth can change the future.',
					},
					{
						type: 'text',
						content: 'As long as we persist, we remain on the road. As long as we work hard, results will follow.',
					},

					{ type: 'subtitle', content: 'Gratitude Beyond Words' }, //22
					{
						type: 'text',
						content:
							'The Little Green Leaves Dream Platform sincerely thanks every dream builder — among them family members, friends, people we know but have never met, and kind supporters we may never personally know.',
					},
					{
						type: 'text',
						content:
							'Thank you for choosing to believe in Little Green Leaves. As a student, I see this as the power of shared trust and collective energy.',
					},
					{ type: 'image', src: imgGratitude1, alt: 'Dream Platform Thanksgiving' },
					{ type: 'image', src: imgGratitude2, alt: 'Dream Platform Thanksgiving' },
					{
						type: 'text',
						content:
							'We also extend heartfelt thanks to leaders at all levels in Kangbao County. Your support gives Little Green Leaves the courage to keep moving forward and the confidence to continue spreading warmth.',
					},

					{ type: 'subtitle', content: 'An Open Invitation' },
					{
						type: 'text',
						content:
							'We look forward to welcoming more caring individuals to join us on this meaningful dream-building journey. You are always welcome to become part of Little Green Leaves Dream Platform.',
					},

					{ type: 'subtitle', content: 'With Gratitude' },
					{
						type: 'text',
						content:
							'Thanksgiving is a time to give thanks. Little Green Leaves is grateful for every meaningful connection, every act of kindness, every gesture of trust.',
					},
					{
						type: 'text',
						content:
							'Grateful to every dream builder who believes in us. Grateful to the leaders who fully support us. Grateful to the family and friends who quietly stand behind us.',
					},
					{
						type: 'text',
						content: 'From little green leaves to a forest — thank you for being here.',
					},
				],
			},
		],
		icon: HeartHandshake,
	},
	{
		year: 2023,
		title: 'Deep Roots',
		summary: 'Witness the growth, stand as a role model!',
		events: [
			{
				id: 'a-new-beginning-again',
				title: 'A New Beginning — Once Again',
				detailBlocks: [
					{ type: 'subtitle', content: 'Farewell and Welcome' },
					{
						type: 'text',
						content:
							'In the blink of an eye, another year has passed, and once again we arrive at a moment of farewell and renewal.',
					},
					{
						type: 'text',
						content: 'Four years have quietly gone by, and I now stand at yet another new beginning.',
					},

					{ type: 'subtitle', content: 'Happy 4th Anniversary' },
					{
						type: 'text',
						content: 'Happy 4th anniversary to the Little Green Leaves Volunteer Alliance public account.',
					},

					{ type: 'subtitle', content: 'Four Years, Eight Years, One Journey' },
					{
						type: 'text',
						content:
							'Four years may not be long, but they have been full and meaningful — a period during which I moved from high school into university.',
					},
					{
						type: 'text',
						content:
							'Four years are also long enough to record countless ordinary yet precious moments, documenting nearly **eight years of growth** for Little Green Leaves, and witnessing its gradual transformation.',
					},

					{ type: 'subtitle', content: 'The Birth of a Home' },
					{
						type: 'text',
						content:
							'From the application process to the successful release of the very first article, every step felt like crossing a river by feeling for stones.',
					},
					{
						type: 'text',
						content:
							'Nevertheless, on **January 1, 2019**, Little Green Leaves Volunteers finally established its own “home.”',
					},
					{
						type: 'text',
						content:
							'Though not always refined or perfect, this platform grew from zero to over **700 followers**, publishing **73 original articles** — including reflections, introductions, gratitude notes, and real-time records.',
					},
					{
						type: 'text',
						content:
							'Each article documents both the growth of Little Green Leaves and the selfless contributions of countless kindhearted supporters, preserving moments of warmth and sincerity.',
					}, //12

					{ type: 'subtitle', content: 'Eight Years of Love in Action' },
					{
						type: 'text',
						content:
							'From the spring of 2016 to the spring of 2023 — eight full years — Little Green Leaves has served as a channel of love, delivering care and warmth across the country to places where help was needed.',
					}, //14
					{
						type: 'text',
						content:
							'During this time, we collected **over 30,000 donated books**, supported **seven primary schools and two orphanages**, and distributed **more than 1,000 pieces of donated clothing**.',
					}, //15
					{
						type: 'text',
						content:
							'Using my own New Year’s gift money, we also purchased dozens of school backpacks and bookshelves.',
					},

					{ type: 'subtitle', content: 'A Window to the World' },
					{
						type: 'text',
						content:
							'In 2019, we successfully established a **Chinese Reading Corner** at the Garden Home Orphanage in Africa.',
					}, //18
					{
						type: 'text',
						content: 'Though small, I believe it will continue to grow — just like Little Green Leaves itself.',
					}, //19
					{
						type: 'text',
						content:
							'I also believe that this small Chinese reading corner will open a window for African children to understand China, and serve as a bridge connecting them to the wider world.',
					}, //20

					{ type: 'subtitle', content: 'Dream Platform: Love Never Paused' },
					{
						type: 'text',
						content:
							'In 2021, I launched the Little Green Leaves Dream Platform to help left-behind children find one-on-one dream-building families.',
					}, //22
					{
						type: 'text',
						content: 'Even during the most difficult years of the pandemic, love continued to move forward.',
					}, //23
					{
						type: 'text',
						content:
							'Over the past two years, we have successfully supported **35 students** facing hardship. Currently, **32 students** continue to receive sponsorship.',
					}, //24
					{
						type: 'text',
						content: 'By the end of 2022, total dream sponsorship funds reached **126,400 RMB**.',
					},
					{
						type: 'text',
						content:
							'While the financial support may not be large, it provides powerful emotional strength — and often gives an entire family hope for the future.',
					}, //26

					{ type: 'subtitle', content: 'Every Reader Is a Dream Builder' }, //27
					{
						type: 'text',
						content:
							'From just a few readers, to dozens, hundreds, and sometimes thousands — every reader of the Little Green Leaves public account is a bearer of great love.',
					}, //28
					{
						type: 'text',
						content: 'Thank you for following and walking alongside us throughout this journey.',
					},
					{
						type: 'text',
						content:
							'My deepest gratitude goes to every supporter — family, friends, teachers, classmates, and kindhearted individuals I may or may not have met.',
					}, //30
					{
						type: 'text',
						content:
							'It is your selfless love that gives Little Green Leaves the strength to persist, and your quiet support that gives us the confidence to move forward with warmth.',
					},

					{ type: 'subtitle', content: 'From Across the Ocean, With Blessings' }, //32
					{
						type: 'text',
						content: 'At this moment, from across the ocean, I send my New Year’s wishes to you.', //33
					},
					{
						type: 'text',
						content: '2022 leaves behind hardship, struggle, and unmet hopes.',
					},
					{
						type: 'text',
						content: '2023 continues with effort, resilience, and acceptance.',
					},
					{
						type: 'text',
						content: '2023 opens a new chapter of lightness, joy, and renewal.',
					},
					{
						type: 'text',
						content: 'May 2023 bring fulfillment, happiness, and beautiful moments.',
					},

					{ type: 'subtitle', content: 'With Gratitude' }, //38
					{
						type: 'text',
						content: 'From little green leaves to a forest — thank you for being here.',
					},
					{
						type: 'text',
						content: 'Wishing everyone a joyful and peaceful New Year.',
					},
				],
			},
			{
				id: 'spring-of-little-green-leaves',
				title: 'Little Green Leaves in Spring',
				detailBlocks: [
					{ type: 'subtitle', content: 'Spring Begins Again' },
					{
						type: 'text',
						content: 'Helping a child can influence a family. Supporting growth can change the future.',
					},
					{
						type: 'text',
						content: 'As long as we stay on the road, effort will lead to results.',
					},
					{
						type: 'text',
						content: 'The **third year** of the Little Green Leaves Dream Platform has officially begun.',
					}, //3

					{ type: 'subtitle', content: 'The Flow of Love' }, //4
					{
						type: 'text',
						content:
							'With the start of a new semester in the first half of 2023, the love and warmth of **35 dream builders** crossed mountains and distances, arriving — as promised — in the hands of every child in need.',
					},
					{ type: 'image', src: imgSpring1, alt: 'Little Green Leaves Spring 2023' }, //6
					{ type: 'image', src: imgSpring2, alt: 'Little Green Leaves Spring 2023' }, //7
					{ type: 'image', src: imgSpring4, alt: 'Little Green Leaves Spring 2023' }, //8

					{ type: 'subtitle', content: 'Warmth, Delivered with Care' }, //9
					{
						type: 'text',
						content:
							'All dream sponsorship funds were personally delivered to the supported children by **Deputy Mayor Liu Yanfeng of Kangbao Town**.',
					}, //10
					{
						type: 'text',
						content:
							'Photos and videos were shared in the “Dream Builder Group,” allowing sponsors to clearly see where their love went, while helping children truly feel society’s care and warmth.',
					},
					{ type: 'image', src: imgSpring5, alt: 'Little Green Leaves Spring 2023' }, //12
					{ type: 'image', src: imgSpring6, alt: 'Little Green Leaves Spring 2023' }, //13
					{ type: 'image', src: imgSpring7, alt: 'Little Green Leaves Spring 2023' }, //14
					{ type: 'image', src: imgSpring8, alt: 'Little Green Leaves Spring 2023' }, //15
					{
						type: 'text',
						content: 'We sincerely thank Deputy Mayor Liu for using his personal time to build this bridge of love.',
					}, //16

					{ type: 'subtitle', content: 'Our Growing Impact' }, //17
					{
						type: 'text',
						content: 'Since the spring of 2021, the Little Green Leaves Dream Platform has grown steadily.',
					},
					{
						type: 'text',
						content: '- Dream builders: from **1** to **45**\n- Supported children: from **1** to **42**',
					}, //19
					{
						type: 'text',
						content:
							'Although some sponsorships paused due to changing circumstances, love has never stopped flowing. New dream builders continue to join, and sponsorships are adjusted responsibly to ensure fairness and effectiveness.',
					}, //20
					{
						type: 'text',
						content: 'As of today, **35 students** continue to receive sustained support and care.',
					}, //21

					{ type: 'subtitle', content: 'Year-by-Year Progress' },
					{
						type: 'text',
						content:
							'- **2021**: 17 underprivileged students supported\n' +
							'- **2022**: Expanded to 31 students\n' +
							'- **2023 (First Half)**: 42 students supported in total; 4 cases discontinued due to eligibility review; **35 students currently supported**',
					}, //23

					{ type: 'subtitle', content: 'Beyond Support, Toward Hope' }, //24
					{
						type: 'text',
						content:
							'Every act of trust and generosity does more than offer material support — it delivers encouragement, confidence, and a positive force that helps shape a child’s future.',
					}, //25
					{
						type: 'text',
						content: 'It brings hope not only to one child, but to an entire family.', //26
					},

					{ type: 'subtitle', content: 'Our Guiding Philosophy' },
					{
						type: 'text',
						content:
							'Our mission is to help students escape poverty both materially and emotionally — to learn how to change their destinies, cultivate gratitude, embrace service, and develop positive, hopeful values.',
					},
					{
						type: 'text',
						content:
							'This is the philosophy behind our dream-building work, and it remains the goal that guides us forward.',
					},
				],
			},
			{
				id: 'witness-growth-become-a-role-model',
				title: 'Witnessing Growth, Becoming a Role Model',
				detailBlocks: [
					{ type: 'subtitle', content: 'Returning to Kangbao, Once Again' }, //0
					{
						type: 'text',
						content: 'Five summers later, today marks my **seventh visit** to the Bashang Plateau — Kangbao.',
					}, //1
					{
						type: 'text',
						content:
							'In the summer of 2018, Little Green Leaves helped establish reading corners in two primary schools in Kangbao County, Zhangjiakou. It was during that journey that I met you — Li Kang — and from that moment on, a bond was formed that could never be undone.',
					}, //2

					{ type: 'subtitle', content: 'Where the Story Began' }, //3
					{
						type: 'text',
						content:
							'Through the introduction of Deputy Mayor Liu Yanfeng of Kangbao Town, I learned that Li Kang was five years old, living in Daoyindi Village. His father had passed away in a traffic accident, his mother had remarried, and he lived with his ailing grandparents.',
					}, //4
					{
						type: 'text',
						content:
							'Local leaders were searching for a caring family to support him. The coincidence felt almost miraculous — a bond between Kangbao and us, between Li Kang and Little Green Leaves.',
					},

					{ type: 'subtitle', content: 'The First Decision' }, //6
					{
						type: 'text',
						content:
							'In June 2018, I visited you at kindergarten for the first time. At that moment, I made a bold decision — to accompany you as you grew up, and to witness our growth together.',
					}, //7
					{ type: 'image', src: imgRole1, alt: 'Li Kang First Meeting' }, //8
					{
						type: 'text',
						content:
							'Back then, both of us were still shy and uncertain. You looked into the camera with a hint of nervousness, unfamiliar with the world.',
					}, //9

					{ type: 'subtitle', content: 'Your First Birthday Together' }, //10
					{
						type: 'text',
						content:
							'In August of the same year, just before the school year began, I returned to Kangbao. It was the first birthday we celebrated together — your fifth.',
					}, //11
					{ type: 'image', src: imgRole2, alt: 'Li Kang Birthday' }, //12
					{
						type: 'text',
						content:
							'Inside a small, worn home, a slightly unstable table held a birthday cake. Surrounded by loved ones, we celebrated a simple yet unforgettable moment.',
					}, //13

					{ type: 'subtitle', content: 'Winter Warmth' },
					{
						type: 'text',
						content:
							'In December 2018, during winter break, I returned again after settling back home. Carrying bags of gifts, I walked through a weathered gate and saw two newly built brick rooms provided by the government.',
					}, //15
					{ type: 'image', src: imgRole3, alt: 'Li Kang Winter Visit' },
					{ type: 'image', src: imgRole4, alt: 'Li Kang Winter Visit' },
					{
						type: 'text',
						content:
							'Even more joyful was seeing your brighter smile. The sense of unfamiliarity had faded — replaced by closeness and endless conversation.',
					}, //18

					{ type: 'subtitle', content: 'Running Toward the Future' },
					{
						type: 'text',
						content:
							'In the summer of 2019, after a four-hour drive, I arrived in Kangbao once more. This time, you jumped off an electric bike and ran toward us.',
					}, //20
					{ type: 'image', src: imgRole5, alt: 'Li Kang Summer Visit' }, //21
					{
						type: 'text',
						content: 'You held your new backpack tightly, circling around us nonstop, overflowing with excitement.',
					}, //22

					{ type: 'subtitle', content: 'Fearless Play, Quiet Growth' },
					{
						type: 'text',
						content:
							'After changing into new clothes, you insisted on going to the village committee office to play. You carefully learned the characters posted at the entrance, then climbed and explored like a little monkey.',
					}, //24
					{ type: 'image', src: imgRole6, alt: 'Li Kang Playing' }, //25

					{
						type: 'text',
						content:
							'I stood below, a little worried, afraid you might fall — but you played with confidence and courage, fully immersed in joy.',
					},
					{ type: 'image', src: imgRole7, alt: 'Li Kang Playing' },
					{ type: 'subtitle', content: 'Confidence Takes Root' }, //28
					{
						type: 'text',
						content:
							'In December 2019, on a snowy winter solstice, I returned again. Wrapped like a little dumpling, you ran out to greet my mother and me, crunching through the snow.',
					}, //29
					{ type: 'image', src: imgRole8, alt: 'Li Kang Winter Visit' },
					{
						type: 'text',
						content:
							'Standing on the warm kang bed, you tried on bright red new clothes, proudly saying, “I have a brother studying in the United States.” You were becoming more confident, brave, and joyful.',
					}, //31

					{ type: 'subtitle', content: 'Growing Without Distance' }, //32
					{
						type: 'text',
						content:
							'After the pandemic, I finally returned in the summer of 2021. Together with my cousin, I brought you the roller skates you had long dreamed of.',
					}, //33
					{ type: 'image', src: imgRole9, alt: 'Li Kang Roller Skates' },
					{
						type: 'text',
						content:
							'There was no sense of distance at all — only excitement. You eagerly showed me your progress: starting primary school, learning pinyin, solving math problems, talking about your teachers and friends.',
					}, //35
					{ type: 'image', src: imgRole10, alt: 'Li Kang Roller Skates' },

					{ type: 'subtitle', content: 'Five Years Later' }, //37
					{
						type: 'text',
						content:
							'2022 was a year of intense college applications, and I was unable to visit. Today, in 2023, I finally returned — this time driving the entire journey myself after earning my license.',
					}, //38
					{ type: 'image', src: imgRole11, alt: 'Li Kang 2023 Visit' }, //39
					{
						type: 'text',
						content:
							'You had grown taller, your smile brighter, your personality more open. Compared to the timid child I first met, you now spoke with confidence, like a young grown-up.',
					}, //40
					{ type: 'image', src: imgRole12, alt: 'Li Kang 2023 Visit' },

					{ type: 'subtitle', content: 'Learning, Dreaming, Believing' }, //42
					{
						type: 'text',
						content:
							'Five years passed in a blink. You are now a third-grade student. After playtime, you opened your textbooks and calligraphy practice sheets to ask questions.',
					}, //43
					{ type: 'image', src: imgRole13, alt: 'Li Kang Studying' },
					{
						type: 'text',
						content:
							'I gently reminded you that handwriting reflects character — to write carefully, stroke by stroke.',
					}, //45

					{ type: 'subtitle', content: 'A Voice of Determination' }, //46
					{
						type: 'text',
						content: 'When I asked if you believed you could attend university someday, you answered softly, “Yes.”',
					}, //47
					{
						type: 'text',
						content: 'When I asked again, you gathered all your strength and shouted loudly, “Yes!”',
					}, //48

					{ type: 'subtitle', content: 'Growing Together' },
					{
						type: 'text',
						content:
							'I do not know exactly who you will become in the future, but I truly look forward to seeing your efforts — your joy, your optimism, your kindness, and your respect for family and teachers.',
					}, //50
					{
						type: 'text',
						content:
							'As I witness your growth, I will not stop moving forward either. I will continue striving to be the role model you can look up to.',
					}, //51
					{ type: 'image', src: imgRole14, alt: 'Li Kang 2023 Visit' },
				],
			},
			{
				id: 'dream-platform-2023-achievements',
				title: 'Little Green Leaves Dream Platform — 2023 Achievements',
				detailBlocks: [
					{ type: 'subtitle', content: 'Good News Worth Sharing' },
					{
						type: 'text',
						content:
							'Today, we are delighted to share the inspiring achievements of the Little Green Leaves Dream Platform in 2023.',
					}, //1

					{ type: 'subtitle', content: 'Every Contribution Delivered with Care' }, //2
					{
						type: 'text',
						content:
							'First, we are pleased to announce a reassuring and meaningful update. After multiple rounds of verification and review, the Little Green Leaves Dream Platform can confidently confirm that **all sponsorship funds for the second half of 2023 have been fully and accurately delivered to every supported child**.',
					}, //3
					{
						type: 'text',
						content:
							'Each contribution represents more than material assistance — it carries the deep care and heartfelt love of our dream builders. We are proud and grateful to have successfully delivered this warmth, as intense and genuine as summer sunshine, into the hands of the children.',
					}, //4

					{ type: 'subtitle', content: 'Growing Together, Reaching Further' },
					{
						type: 'text',
						content:
							'With the continued trust and support of our dream builders, the Dream Platform has reached new milestones this year.',
					}, //6
					{ type: 'image', src: imgNews1, alt: 'Dream Platform 2023 Achievements' },
					{ type: 'image', src: imgNews2, alt: 'Dream Platform 2023 Achievements' },
					{ type: 'image', src: imgNews3, alt: 'Dream Platform 2023 Achievements' },
					{ type: 'image', src: imgNews4, alt: 'Dream Platform 2023 Achievements' },
					{ type: 'image', src: imgNews5, alt: 'Dream Platform 2023 Achievements' },
					{
						type: 'text',
						content:
							'In 2023 alone, we expanded our support to **19 additional children** — young individuals facing economic hardship, yet full of hope and passion for life.',
					}, //12
					{
						type: 'text',
						content:
							'This means that 19 more young hearts have been encouraged, and 19 more families have found hope during difficult times.',
					},
					{
						type: 'text',
						content:
							'Since 2021, the Little Green Leaves Dream Platform has supported **53 children** in total, with cumulative sponsorship funds reaching **237,800 RMB**.',
					}, //14
					{ type: 'image', src: imgNews6, alt: 'Dream Platform 2023 Achievements' },
					{ type: 'image', src: imgNews7, alt: 'Dream Platform 2023 Achievements' },
					{ type: 'image', src: imgNews8, alt: 'Dream Platform 2023 Achievements' },
					{ type: 'image', src: imgNews9, alt: 'Dream Platform 2023 Achievements' },
					{ type: 'image', src: imgNews10, alt: 'Dream Platform 2023 Achievements' },

					{ type: 'subtitle', content: 'A Story of Resilience and Hope' }, //20
					{
						type: 'text',
						content:
							'Among the many children supported by the Dream Platform, one story stands out — that of **Student Wu**.',
					}, //21
					{
						type: 'text',
						content:
							'Her upbringing was filled with hardship. She lost her mother at a young age, and her father was unable to work due to illness. From early on, she learned independence and lived for long periods with her aunt.',
					}, //22
					{
						type: 'text',
						content:
							'Despite life’s challenges, she persevered with determination and discipline. This year, she achieved an impressive **568 points on the National College Entrance Examination** and was successfully admitted to **Hebei University**.',
					}, //23
					{
						type: 'text',
						content:
							'Her success is a source of pride for the Dream Platform — and for every dream builder who supported her. Her journey proves that even in adversity, effort can carve a path forward.',
					}, //24
					{ type: 'image', src: imgNews11, alt: 'Student Wu College Entrance Exam' }, //25
					{
						type: 'text',
						content:
							'With your continued companionship and encouragement, we believe more children will follow in her footsteps — breaking through hardship and pursuing their dreams with courage.',
					}, //26

					{ type: 'subtitle', content: 'Our Guiding Mission' },
					{
						type: 'text',
						content:
							'We remain committed to the founding mission of the Little Green Leaves Dream Platform: to help students escape poverty both materially and emotionally, to learn how to change their destinies, and to cultivate a spirit of contribution and gratitude.',
					}, //28
					{
						type: 'text',
						content:
							'We strive to guide them toward a positive, optimistic outlook on life and to achieve meaningful, lasting transformation. This is our philosophy — and our ultimate goal.',
					}, //29

					{ type: 'subtitle', content: 'With Deep Gratitude' },
					{
						type: 'text',
						content: 'Once again, we extend our heartfelt thanks to every dream builder.',
					},
					{
						type: 'text',
						content:
							'Because of you, more children are no longer alone on their journey of growth, learning, and dreaming. With confidence and determination, they continue moving forward.',
					},
				],
			},
		],
		icon: Users,
	},
	{
		year: 2024,
		title: 'Forest of Allies',
		summary: 'Years of Efforts, Together We Grow!',
		events: [
			{
				id: 'little-green-leaves-first-five-years',
				title: 'The First Five Years of Little Green Leaves Official Accounts',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Milestone Worth Remembering' },
					{
						type: 'text',
						content:
							'Sunlight blends with the morning glow, adding warmth to a new beginning. Little Green Leaves has quietly completed its first five years — a journey shaped by love, persistence, and belief.',
					},

					{ type: 'subtitle', content: 'Growing Together with Time' },
					{
						type: 'text',
						content:
							'These five years are like a personal diary, recording a path from high school into university, from curiosity into responsibility.',
					},
					{
						type: 'text',
						content:
							'Along the way, Little Green Leaves grew side by side with its founder — from youthful uncertainty to steady commitment — each step taken firmly on the road of purpose and compassion.',
					}, //4

					{ type: 'subtitle', content: 'From Giving Things to Nurturing Dreams' }, //5
					{
						type: 'text',
						content:
							'Over time, Little Green Leaves evolved from collecting books and clothing into building a one-to-one Dream Support system.',
					}, //6
					{
						type: 'text',
						content:
							'The mission expanded from meeting material needs to nurturing inner strength — offering emotional support, encouragement, and long-term companionship to children in need.',
					}, //7

					{
						type: 'text',
						content:
							'Five years of efforts. We cannot reach this point without you. Thank you for being part of our journey.',
					}, //8

					{ type: 'subtitle', content: 'Books as Bridges to the World' }, //9
					{
						type: 'text',
						content:
							'Since its beginnings, Little Green Leaves has collected and donated over **30,000 books**, supporting **7 rural primary schools** and **2 orphanages**.',
					}, //10
					{
						type: 'text',
						content:
							'Along the way, **2 libraries and 46 reading corners** were established — including a special **Chinese Reading Corner in an African orphanage**, opening a small yet meaningful window for children to understand China and the wider world.',
					}, //11

					{ type: 'subtitle', content: 'Love Never Paused, Even in Uncertainty' }, //12
					{
						type: 'text',
						content: 'During the pandemic, when distance separated people, compassion continued to travel.',
					}, //13
					{
						type: 'text',
						content:
							'In 2020, the Little Green Leaves team participated in the **Public Benefit International Challenge for Youth (PBIC)**, earning the **National Championship** and raising **86,868 RMB** to support an African orphanage.',
					}, //14

					{ type: 'subtitle', content: 'The Dream Platform Takes Root' }, //15
					{
						type: 'text',
						content:
							'In 2021, Little Green Leaves launched the Dream Platform, focusing on the emotional well-being of left-behind children and building long-term, one-to-one support relationships.',
					}, //16
					{
						type: 'text',
						content:
							'Over three years, the platform has supported **54 children**, with **45 currently receiving sponsorship**, and total contributions reaching **232,600 RMB**.',
					}, //17
					{
						type: 'text',
						content:
							'Behind these numbers are **56 dream builders** from diverse backgrounds — students, professionals, medical workers, entrepreneurs — many of whom had never met the founder, yet chose trust and kindness.',
					}, //18

					{ type: 'subtitle', content: 'Trust That Grows into a Forest' }, //19
					{
						type: 'text',
						content:
							'This journey was never walked alone. Each supporter offered not only resources, but belief — turning small acts of kindness into a growing forest of hope.',
					}, //20

					{ type: 'subtitle', content: 'Looking Ahead to the Next Five Years' }, //21
					{
						type: 'text',
						content:
							'The first five years laid the roots. The next chapters will continue to grow — supporting more children, strengthening more families, and writing new stories of resilience and love.',
					}, //22
					{
						type: 'text',
						content:
							'When green leaves gather, a forest grows. With gratitude and hope, Little Green Leaves moves forward — together with you.',
					},
				],
			},
			{
				id: 'little-green-leaves-spring-2024',
				title: 'The Spring of Little Green Leaves',
				detailBlocks: [
					{ type: 'subtitle', content: 'Spring Returns, Growth Continues' }, //0
					{
						type: 'text',
						content:
							'As spring arrives once again, the Little Green Leaves Dream Platform quietly completes its third year. What began in the spring of 2021 as a small seed has steadily grown — from zero, to one, and then to many.',
					}, //1
					{
						type: 'text',
						content:
							'Over the past three years, we have helped **58 children from underprivileged backgrounds** find one-to-one dream-support families. While some sponsorships were paused due to eligibility changes, **48 children are currently continuing to receive sustained care and support**.',
					}, //2

					{ type: 'subtitle', content: 'Love That Never Stops Flowing' }, //3
					{
						type: 'text',
						content:
							'During these three years, **64 dream builders** joined the Little Green Leaves journey. Some had to pause along the way for personal reasons, yet warmth never stopped flowing — new dream builders continued to arrive, one after another.',
					}, //4
					{
						type: 'text',
						content:
							'They come from all walks of life: business leaders, principals, doctors, teachers, lawyers, young professionals, university students, and high school students. They come from across the country.',
					}, //5
					{
						type: 'text',
						content:
							'Some are family members, teachers, friends, or classmates of Little Green Leaves — but most are people who had never met us, and in some cases, did not even know us before choosing to trust, support, and walk this path without hesitation.',
					}, //6
					{
						type: 'text',
						content:
							'It is this unconditional trust that gives Little Green Leaves the courage to persist and the strength to move forward with warmth. Perhaps this is the quiet power of unseen connections — an energy that brings us together on the road of building dreams.',
					}, //7
					{ type: 'image', src: imgSpring20241, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring20242, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring20243, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring20244, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring20245, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring20246, alt: 'Little Green Leaves Spring 2024' },

					{ type: 'subtitle', content: '2024: Delivering Warmth, One Step at a Time' }, //14
					{
						type: 'text',
						content:
							'In the first half of 2024, **all Dream Platform funds were fully and accurately delivered to every supported child**.',
					}, //15
					{
						type: 'text',
						content:
							'Even during the coldest season, this love crossed mountains and distances — warming unfamiliar hearts, encouraging unseen hopes, and lighting the path forward for a new generation.',
					}, //16

					{ type: 'subtitle', content: 'Transparency and Trust' }, //17
					{
						type: 'text',
						content:
							'2023 marked the fastest growth period in our journey, with **20 newly supported children**. At the beginning of 2024, **4 more children** joined the program.',
					}, //18
					{
						type: 'text',
						content:
							'Little Green Leaves remains committed to openness and transparency. All sponsorship funds are delivered through **county, township, and village-level government leaders**, who assist dream builders in personally transferring funds to children and families.',
					}, //19
					{
						type: 'text',
						content:
							'Photos and videos are shared promptly in the Dream Builder groups, ensuring that every contribution is visible, traceable, and meaningful. This careful process has earned the trust of more supporters and the recognition of women’s federations and education authorities.',
					}, //20
					{ type: 'image', src: imgSpring20247, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring20248, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring20249, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring202410, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring202411, alt: 'Little Green Leaves Spring 2024' },
					{ type: 'image', src: imgSpring202412, alt: 'Little Green Leaves Spring 2024' },

					{ type: 'subtitle', content: 'Our Guiding Philosophy' }, //27
					{
						type: 'text',
						content:
							'Our mission remains unchanged: to help students escape poverty both materially and emotionally, to learn how to change their destinies, and to cultivate a spirit of gratitude, contribution, and love for life.',
					}, //28
					{
						type: 'text',
						content:
							'We strive to guide them toward a positive, optimistic outlook on life and to pursue meaningful, long-term transformation. This is our philosophy — and our ultimate goal.',
					}, //29

					{ type: 'subtitle', content: 'Growing Year by Year' }, //30
					{
						type: 'text',
						content: '• 2018–2020: Supported two children using personal savings, contributing **12,000 RMB**.',
					}, //31
					{
						type: 'text',
						content: '• 2021: Helped **19 students**, with **39,400 RMB** in sponsorship funds.',
					}, //32
					{
						type: 'text',
						content: '• 2022: Expanded to **34 students**, with **77,800 RMB** in sponsorship funds.',
					}, //33
					{
						type: 'text',
						content:
							'• 2023: Supported **54 students** (43 active by year-end), with **102,200 RMB** in sponsorship funds; one student admitted to **Hebei University**.',
					}, //34
					{
						type: 'text',
						content: '• 2024 (First Half): Supporting **48 children**, with **57,300 RMB** delivered.',
					}, //35
					{
						type: 'text',
						content: 'To date, cumulative Dream Platform sponsorship funds total **288,700 RMB**.',
					}, //36

					{ type: 'subtitle', content: 'Still on the Road of Dream Building' }, //37
					{
						type: 'text',
						content: 'With gratitude in our hearts, we move forward with greater focus and humility.',
					}, //38
					{
						type: 'text',
						content:
							'It is your trust and support that give Little Green Leaves its strength and confidence. It is the encouragement from leaders at all levels that gives us the opportunity to keep dreaming.',
					}, //39
					{
						type: 'text',
						content: 'Help a child. Influence a family. Build dreams. Change the future.',
					}, //40
					{
						type: 'text',
						content: 'As long as we stay on the road, effort will always bear fruit.',
					}, //41
				],
			},
			{
				id: 'dream-platform-kangbao-2024',
				title: 'Seven Years of Commitment — Warmth in Bloom | Little Green Leaves Kangbao Visit',
				detailBlocks: [
					{ type: 'subtitle', content: 'A Seed of Love Takes Root in Kangbao' }, //0
					{ type: 'image', src: imgKangbao20241, alt: 'Little Green Leaves Kangbao Visit 2024' }, //1
					{
						type: 'text',
						content:
							'On the land of Kangbao, a small green leaf has been quietly growing, carrying hope and warmth. The story of the Little Green Leaves Dream Platform began with a simple act of donation.',
					}, //2
					{ type: 'image', src: imgKangbao20242, alt: 'Little Green Leaves Kangbao Visit 2024' }, //3
					{
						type: 'text',
						content:
							'In 2018, my first visit to Kangbao County was to deliver donated books and clothing collected by the Little Green Leaves Volunteers. During that visit, we noticed something deeply unsettling: many children avoided eye contact, hesitated to greet strangers, and carried insecurity in their eyes and behavior.',
					}, //4
					{ type: 'image', src: imgKangbao20243, alt: 'Little Green Leaves Kangbao Visit 2024' }, //5
					{
						type: 'text',
						content:
							'These moments revealed a deeper truth — the children were not only lacking material support, but were also facing urgent emotional and psychological challenges. Poverty is not just material scarcity; it is often a poverty of confidence, security, and hope.',
					}, //6
					{
						type: 'text',
						content:
							'This realization led to the founding of the **Little Green Leaves Dream Platform in 2021**, with a clear purpose: to support children from the inside out, helping them feel seen, valued, and supported by society.',
					}, //7

					{ type: 'subtitle', content: 'Seven Years of Care, Growing Greener Each Year' }, //8
					{
						type: 'text',
						content:
							'Since its launch, the Dream Platform has journeyed through multiple seasons of growth. Over these years, we have witnessed countless moments of transformation — children rediscovering confidence, students entering their dream universities, families stepping out of hardship, and more caring individuals joining our mission.',
					}, //9
					{ type: 'image', src: imgKangbao20244, alt: 'Little Green Leaves Kangbao Visit 2024' }, //10
					{ type: 'image', src: imgKangbao20245, alt: 'Little Green Leaves Kangbao Visit 2024' }, //11
					{ type: 'image', src: imgKangbao20246, alt: 'Little Green Leaves Kangbao Visit 2024' }, //12

					{ type: 'subtitle', content: 'Returning to Kangbao: A Reunion of Hope' }, //13
					{
						type: 'text',
						content:
							'On **August 7, 2024**, we once again set foot in Kangbao after a four-hour journey — carrying not only our own passion, but the collective hopes of countless dream builders.',
					}, //14
					{
						type: 'text',
						content:
							'We hosted the event **“Nurturing Dreams with Love, Safeguarding Mental Well-being — 2024 Little Green Leaves Kangbao Visit.”**',
					}, //15
					{
						type: 'text',
						content:
							'The event was strongly supported by local leadership. The Chair of the Kangbao Women’s Federation, Town Mayor Liu Yanfeng, and village secretaries attended despite their busy schedules. **35 children and their grandparents** gathered together to witness this moment of shared care.',
					}, //16
					{ type: 'image', src: imgKangbao20247, alt: 'Little Green Leaves Kangbao Visit 2024' }, //17
					{
						type: 'text',
						content:
							'We prepared backpacks, water bottles, jump ropes, and books — gifts that carried not only material value, but encouragement and emotional nourishment.',
					}, //18
					{ type: 'image', src: imgKangbao20248, alt: 'Little Green Leaves Kangbao Visit 2024' }, //19
					{ type: 'subtitle', content: 'Sharing Confidence, Planting Dreams' }, //20
					{ type: 'image', src: imgKangbao20249, alt: 'Little Green Leaves Kangbao Visit 2024' }, //21
					{ type: 'image', src: imgKangbao202410, alt: 'Little Green Leaves Kangbao Visit 2024' }, //22
					{
						type: 'text',
						content:
							'As the founder of Little Green Leaves, I had the opportunity to speak with the children about the importance of self-confidence and how it can be built.',
					}, //23
					{
						type: 'text',
						content:
							'Looking into their eager eyes and listening to their aspirations for the future, I could hardly believe these were the same children who once avoided eye contact. This transformation strengthened my resolve — every child is a seed of hope, and with care, they will grow.',
					}, //24

					{ type: 'subtitle', content: 'Every Drop of Love, A Growing Ocean' }, //25
					{
						type: 'text',
						content:
							'From simple donations to comprehensive, long-term support, the growth of Little Green Leaves has been steady and heartfelt.',
					}, //26
					{
						type: 'text',
						content: 'As of **August 7, 2024**:',
					}, //27
					{
						type: 'text',
						content:
							'• **65 children** have received support in total\n• **55 children** are currently receiving ongoing sponsorship\n• **360,600 RMB** in total sponsorship funds have been delivered',
					}, //28
					{ type: 'image', src: imgKangbao202411, alt: 'Little Green Leaves Kangbao Visit 2024' }, //29
					{ type: 'image', src: imgKangbao202412, alt: 'Little Green Leaves Kangbao Visit 2024' }, //30
					{ type: 'subtitle', content: 'Transparency Builds Trust' }, //31
					{
						type: 'text',
						content: 'By the second half of 2024, most Dream Platform funds had already been successfully delivered.',
					}, //32
					{
						type: 'text',
						content:
							'Every contribution is transferred with the assistance of county, township, and village-level officials, ensuring that funds are personally delivered to supported children and families.',
					}, //33
					{ type: 'image', src: imgKangbao202413, alt: 'Little Green Leaves Kangbao Visit 2024' }, //34
					{
						type: 'text',
						content:
							'Photos and videos are shared promptly within the Dream Builder groups, ensuring transparency, accountability, and trust — a system that has earned the confidence of more supporters over time.',
					}, //35

					{ type: 'subtitle', content: 'Our Unchanging Mission' }, //36
					{
						type: 'text',
						content:
							'The guiding mission of the Little Green Leaves Dream Platform has never changed: to help children escape poverty both materially and emotionally, to learn how to change their destinies, and to cultivate gratitude, resilience, and a spirit of giving.',
					}, //37
					{
						type: 'text',
						content:
							'We aim to guide them toward a positive, optimistic outlook on life and toward meaningful, lasting transformation. This is our philosophy — and our ultimate goal.',
					}, //38

					{ type: 'subtitle', content: 'Walking Forward Together' }, //39
					{
						type: 'text',
						content: 'Behind every number is a caring heart, dedicated leadership, and the quiet growth of a child.',
					}, //40
					{
						type: 'text',
						content:
							'The journey of Little Green Leaves continues — rooted in trust, sustained by love, and guided by the belief that warmth, once planted, will always bloom.',
					}, //41
				],
			},
		],
		icon: Leaf,
	},

	{
		year: 2025,
		title: 'Ten years of efforts --- We stand together',
		summary: 'Green, Greener, Greenest: A Decade of Growth and Unity',
		events: [
			{
				id: 'nine-year-journey',
				title: 'Nine Years of Giving — From a Single Book to a Forest of Hope',
				detailBlocks: [
					{ type: 'subtitle', content: 'Nine Years, Three Chapters, One Heart' }, //0
					{
						type: 'text',
						content:
							'Time has flown by — and Little Green Leaves has now journeyed through **nine full years**. What began with a single book, a small act of warmth, and a simple dream has grown into a thriving oasis of compassion.',
					}, //1
					{
						type: 'text',
						content:
							'These nine years have unfolded in three meaningful stages: **Little Green Leaves Book Corners** (planting the seed), **Little Green Leaves Warmth Delivery** (taking root), and **Little Green Leaves Dream Platform** (growing upward with strength). Every step has been shaped by countless caring hands — and filled with moments of kindness and gratitude we will never forget.',
					}, //2

					{ type: 'subtitle', content: 'Chapter 1 — Little Green Leaves Book Corners' }, //3
					{
						type: 'text',
						content:
							'The story of Little Green Leaves began with the power of books. Back then, we were still middle school students — saving pocket money and collecting secondhand books through holiday donation drives — to build “Little Green Leaves Book Corners” for under-resourced rural schools.',
					}, //4
					{
						type: 'text',
						content:
							'Since **2016**, more than **30,000 donated books** have supported **7 primary schools** and **2 orphanages**. These books crossed mountains and distance to become spiritual nourishment — opening children’s horizons and guiding them toward their dreams.',
					}, //5
					{
						type: 'text',
						content:
							'I still remember the children’s faces — the surprise, the wide smiles, and the small groups gathering together to flip through pages. Those book corners lit the first morning light of hope for many children, and also planted a seed deeply in my own heart.',
					}, //6
					{
						type: 'text',
						content:
							'They taught me something lasting: **with belief, intention, and action, even the smallest kindness can gather into a powerful force.**',
					}, //7

					{ type: 'subtitle', content: 'Chapter 2 — Little Green Leaves Warmth Delivery' }, //8
					{
						type: 'text',
						content:
							'After the Book Corners, we realized that children in underserved areas needed more than knowledge — they also needed material support. That is how **Little Green Leaves Warmth Delivery** was born.',
					}, //9
					{
						type: 'text',
						content:
							'From a winter coat to warm shoes, from school supplies to daily necessities, we worked to bring more color and comfort into children’s lives — closing the distance between hearts through action.',
					}, //10
					{
						type: 'text',
						content:
							'Seeing children put on new clothes with joy, or open a backpack full of supplies with curiosity, reminded us that this warmth was not only improving living conditions — it was also offering comfort, dignity, and encouragement.',
					}, //11
					{
						type: 'text',
						content:
							'It helped children feel what every child deserves to feel: **being cared for, being seen, and being supported.**',
					}, //12

					{ type: 'subtitle', content: 'Chapter 3 — Little Green Leaves Dream Platform' }, //13
					{
						type: 'text',
						content:
							'As our work deepened, we came to understand that material support matters — but **long-term companionship and emotional care** are what truly help children change their futures.',
					}, //14
					{
						type: 'text',
						content:
							'In **2021**, the **Little Green Leaves Dream Platform** was created. Through one-on-one sponsorship and holistic care, every supported child is matched with a “Dream Partner” family.',
					}, //15
					{
						type: 'text',
						content:
							'Dream builders provide financial support, but also stay connected through messages, video calls, and ongoing communication — guiding children in both study and daily life. Many children have gradually grown stronger through this steady warmth: once uncertain eyes become determined; once timid hearts become confident.',
					}, //16
					{
						type: 'text',
						content:
							'Alongside sponsorship, Little Green Leaves also organizes online programs such as learning support, dream-building guidance, and emotional well-being activities — helping children find direction and giving them wings to pursue the future.',
					}, //17

					{ type: 'subtitle', content: 'A Community of Trust, A Network of Love' }, //18
					{
						type: 'text',
						content:
							'Time has deepened our shared goodwill. Today, we are supported by **97 caring families** and, together with dedicated volunteers, **over 100 loving supporters** have come together through this platform.',
					}, //19
					{
						type: 'text',
						content:
							'They come from every walk of life — entrepreneurs, university teachers, legal professionals, doctors and nurses, young professionals, and students full of promise. Many of us have never met in person, yet we choose to trust one another and walk forward together through kindness.',
					}, //20
					{
						type: 'text',
						content:
							'So far, the Dream Platform has supported **90 children** across China — and our love has also crossed borders.',
					}, //21
					{
						type: 'text',
						content:
							'In **2019**, we established a Chinese book corner in Kenya. In **2020**, through the PBIC Global Youth Public Benefit Innovation Challenge, we raised **80,000+ RMB** to support children in Kenya and improve their living and learning conditions.',
					}, //22

					{ type: 'subtitle', content: 'Transparency, Accountability, Respect' }, //23
					{
						type: 'text',
						content: 'Since 2020, cumulative Dream Platform sponsorship funds have approached **500,000 RMB**.',
					}, //24
					{
						type: 'text',
						content:
							'Every contribution is delivered through a transparent, publicly accountable process — ensuring that funds reach the supported children **in full**, and that updates are shared promptly in our Dream Builder groups.',
					}, //25
					{
						type: 'text',
						content:
							'Behind every number is a real child, a real family, and a real connection — a dialogue across distance, built on trust and love.',
					}, //26

					{ type: 'subtitle', content: 'Warmth On the Road, Always' }, //27
					{
						type: 'text',
						content:
							'Little Green Leaves believes the road ahead will grow even wider. Across China — and even across the world — we hope to reach more people in need, gather small drops of kindness into rivers, and help dreams create miracles.',
					}, //28
					{
						type: 'text',
						content:
							'Nine years of growth: one green leaf has become a thriving canopy. Our初心 (original intention) remains unchanged — to build bridges through compassion, to stand on trust, and to light the way with companionship — so that more children gain the courage and ability to change their futures.',
					}, //29
					{
						type: 'text',
						content:
							'Whether it is a book corner being lit, a warm package being delivered, or steady support along the dream-building journey — Little Green Leaves will always be here, walking alongside every caring heart.',
					}, //30
					{
						type: 'text',
						content:
							'Nine years of chapters — thank you for being part of them. From a single leaf to fields of green, we believe: **as long as there is love, everything is possible.**',
					}, //31
					{
						type: 'text',
						content:
							'May the next nine years find us still walking side by side — giving more lives the strength they need, and watching more dreams break through the soil and grow freely toward the light.',
					}, //32
					{
						type: 'text',
						content: 'Little Green Leaves becomes a forest — thank you for being with us.',
					}, //33
				],
			},
			{
				id: 'ten-year-journey-report-card',
				title: 'Ten Years of Commitment — The Little Green Leaves Report Card',
				detailBlocks: [
					{ type: 'subtitle', content: 'Time as a Witness' }, //0
					{
						type: 'text',
						content:
							'Time is the most faithful witness. Ten years ago, a small seed called the **Little Green Leaves Volunteers Alliance** was quietly planted.',
					}, //1
					{
						type: 'text',
						content:
							'Its dream was simple, yet profound: to help children facing hardship — yet carrying starlight in their eyes — find a guiding light, a source of support, and a “dream family” that could walk alongside them.',
					}, //2

					{ type: 'subtitle', content: 'Ten Years of Growth, One Path of Love' }, //3
					{
						type: 'text',
						content:
							'Over the past decade, like spring rain nourishing the earth, Little Green Leaves has grown steadily and quietly.',
					}, //4
					{
						type: 'text',
						content:
							'From its first tentative steps to its present strength, the organization has expanded from **book donations** and **clothing drives** to the creation of the **Little Green Leaves Dream Platform** — growing itself while witnessing the fulfillment of countless children’s dreams.',
					}, //5
					{
						type: 'text',
						content: 'This summer, we harvested some of the sweetest fruits of that long journey.',
					}, //6

					{ type: 'subtitle', content: 'Good News That Echoes with Hope' }, //7
					{
						type: 'text',
						content:
							'Joyful news has reached us: among the **135 children** supported by Little Green Leaves, **five students** entered the national college entrance examination this year and achieved outstanding results.',
					}, //8
					{
						type: 'text',
						content: 'With perseverance as their pen, they wrote the most remarkable chapters of their youth.',
					}, //9
					{
						type: 'text',
						content:
							'Most heartwarming of all was a pair of **twin brothers**, who were admitted respectively to **Hebei University** and **Hebei University of Science and Technology**, each entering their dream institutions.',
					}, //10
					{
						type: 'text',
						content:
							'In addition, three other students were admitted to **Yanjing Institute of Technology** and **Baoding University of Technology**, marking another proud milestone.',
					}, //11
					{ type: 'image', src: imgDecade1, alt: 'Little Green Leaves Ten Year Report Card' }, //12
					{ type: 'image', src: imgDecade2, alt: 'Little Green Leaves Ten Year Report Card' }, //13
					{ type: 'image', src: imgDecade3, alt: 'Little Green Leaves Ten Year Report Card' }, //14

					{ type: 'subtitle', content: 'Shining on the Middle School Path' }, //15
					{
						type: 'text',
						content:
							'At the same time, **three more students** stood out in the middle school entrance examinations, achieving impressively high scores and delivering truly exceptional performances.',
					}, //16
					{ type: 'image', src: imgDecade4, alt: 'Little Green Leaves Ten Year Report Card' }, //17
					{
						type: 'text',
						content:
							'We can almost see it — the once timid faces now glowing with confidence, the once uncertain eyes now filled with determination for the future.',
					}, //18

					{ type: 'subtitle', content: 'A Shared Achievement' }, //19
					{
						type: 'text',
						content: 'This report card belongs to the diligent and resilient children.', //20
					},
					{
						type: 'text',
						content: 'It belongs to the selfless dream-building families who offered steady companionship and care.',
					}, //21
					{
						type: 'text',
						content:
							'And it belongs to **every single person** who has supported, believed in, and walked alongside Little Green Leaves over the years.',
					}, //22

					{ type: 'subtitle', content: 'One-on-One Support, Long-Term Companionship' }, //23
					{
						type: 'text',
						content:
							'Since the launch of the **Little Green Leaves Dream Platform in 2021**, every step forward has been steady and intentional.',
					}, //24
					{
						type: 'text',
						content:
							'One-on-one sponsorship represents deeper connection, more precise support, and enduring companionship.',
					}, //25
					{
						type: 'text',
						content:
							'We have witnessed children grow from primary school to middle school, and from middle school to university — and alongside them, we have seen beautiful bonds form between dream families and children: not related by blood, yet closer than family.',
					}, //26

					{ type: 'subtitle', content: 'The Road Ahead, Together' }, //27
					{
						type: 'text',
						content: 'Ten years is not an ending — it is only a beginning.',
					}, //28
					{
						type: 'text',
						content:
							'There are still many children waiting for a light, waiting for an opportunity to change their destiny.',
					}, //29
					{
						type: 'text',
						content:
							'Every moment of attention, every act of sharing, may become the bridge that connects the next child to their dream.',
					}, //30

					{ type: 'subtitle', content: 'Still a Green Leaf, Still Moving Forward' }, //31
					{
						type: 'text',
						content: 'Let us continue to be those quiet “Little Green Leaves” —',
					}, //32
					{
						type: 'text',
						content: 'holding up a clear sky for more dreams, and walking together toward a future filled with light.',
					},
				],
			},
			{
				id: 'dream-platform-2025-56-dreams',
				title: '2025 — Lighting the Way for 56 Dreams',
				detailBlocks: [
					{ type: 'subtitle', content: '2025 Little Green Leaves Dream Platform' }, //0
					{
						type: 'text',
						content:
							'Time flows on, yet love never pauses. Standing at the final quarter of 2025 and looking back, the Little Green Leaves Dream Platform has once again completed a journey that is both solid and deeply heartwarming.',
					}, //1

					{ type: 'subtitle', content: 'From One Beginning to Many Destinies' }, //2
					{
						type: 'text',
						content:
							'Since the launch of the project in 2021, Little Green Leaves has helped **137 children** connect with their own “dream families.”',
					}, //3
					{
						type: 'text',
						content:
							'In the most recent round of sponsorship delivery in the second half of 2025, we witnessed another year filled with meaningful achievements.',
					}, //4
					{
						type: 'text',
						content:
							'As of now, **56 new children** have received **one-on-one, long-term sponsorship**, opening a brand-new chapter in their lives.',
					}, //5

					{ type: 'subtitle', content: 'Holding Up 56 Dreams' }, //6
					{
						type: 'text',
						content:
							'Behind this powerful report card stand **43 newly joined dream builders**, whose selfless dedication made these connections possible.',
					}, //7
					{ type: 'image', src: imgLighting1, alt: 'Little Green Leaves 2025 Dream Platform' }, //8
					{
						type: 'text',
						content:
							'They come from all across the country. Like sparks of light, they converged into a radiant glow, illuminating the road ahead for these children.',
					}, //9

					{ type: 'subtitle', content: 'Stories That Move Us Deeply' }, //10
					{
						type: 'text',
						content: 'We are especially touched by the many moving moments along this journey.',
					}, //11
					{
						type: 'text',
						content:
							'Some dream builders, after seeing the children they supported enter university, immediately chose to sponsor new children in need — ensuring that the dream journey never pauses.',
					}, //12
					{ type: 'image', src: imgLighting2, alt: 'Little Green Leaves 2025 Dream Platform' }, //13
					{
						type: 'text',
						content:
							'Others not only sponsored children themselves, but also inspired and guided the children they supported to join the dream-building journey — a powerful testament to the strength of example.',
					}, //14
					{
						type: 'text',
						content:
							'There are also dream builders who generously held the hands of **two children at once**, allowing two dreams to take flight side by side.',
					}, //15
					{
						type: 'text',
						content:
							'Most remarkably, one dream builder — the deeply compassionate **Teacher Fu** — single-handedly supported **12 children**, building a solid foundation for their dreams and embodying the profound spirit of “loving all children as one’s own.”',
					}, //16
					{ type: 'image', src: imgLighting3, alt: 'Little Green Leaves 2025 Dream Platform' }, //17
					{ type: 'image', src: imgLighting4, alt: 'Little Green Leaves 2025 Dream Platform' }, //18
					{ type: 'image', src: imgLighting5, alt: 'Little Green Leaves 2025 Dream Platform' }, //19

					{ type: 'subtitle', content: 'More Than Financial Support' }, //20
					{
						type: 'text',
						content: 'Every number represents a future that has been illuminated.',
					}, //21
					{
						type: 'text',
						content:
							'For us, Little Green Leaves Dream Platform has never been merely about transferring sponsorship funds.',
					}, //22
					{
						type: 'text',
						content: 'We remain firmly committed to the core mission established at the very beginning of the project.',
					}, //23

					{ type: 'subtitle', content: 'Our Core Belief' }, //24
					{
						type: 'text',
						content:
							'To help students escape poverty both materially and emotionally, to learn how to change their destiny, to cultivate a spirit of contribution and generosity, and to grow into people who are grateful, optimistic, and passionate about life.',
					}, //25
					{
						type: 'text',
						content:
							'We strive to guide them toward a positive, confident, and upward-looking outlook on life, achieving true and lasting transformation.',
					}, //26
					{
						type: 'text',
						content:
							'Helping a child break free from poverty **in their heart** is the most genuine form of poverty alleviation.',
					}, //27

					{ type: 'subtitle', content: 'Being Seen, Being Believed In' }, //28
					{
						type: 'text',
						content:
							'What we support is not only tuition and textbooks, but also the dignity of being seen, the confidence of “I can do it,” and the courage that comes from hope.',
					}, //29
					{
						type: 'text',
						content:
							'Through long-term, one-on-one companionship and care, we want every child to know they are not alone, and that their dreams are worthy of protection.',
					}, //30
					{
						type: 'text',
						content:
							'This inner richness becomes the strongest force driving them to overcome hardship and pursue their future — enabling true, inside-out transformation.',
					}, //31

					{ type: 'subtitle', content: 'Gratitude Along the Way, Hope Ahead' }, //32
					{
						type: 'text',
						content: 'Our heartfelt thanks go to every dream builder.',
					}, //33
					{
						type: 'text',
						content: 'It is your trust and support that allow these young dreams to take flight with confidence.',
					}, //34
					{
						type: 'text',
						content:
							'We also thank every friend who follows and supports Little Green Leaves — every share and every word of encouragement helps form a stronger current of love.',
					}, //35

					{ type: 'subtitle', content: 'Continuing the Journey' }, //36
					{
						type: 'text',
						content: 'As the chapter of 2025 draws to a close, the story of love continues.',
					}, //37
					{
						type: 'text',
						content:
							'May we keep walking together, as quiet yet steadfast “Little Green Leaves,” holding up a sky full of possibilities for more children who need support.',
					}, //38
					{
						type: 'text',
						content: 'Little Green Leaves Dream Platform — because every dream is worth pursuing.',
					}, //39
					{
						type: 'text',
						content: 'From one green leaf to a forest — thank you for being with us.',
					}, //40
				],
			},
		],
		icon: Leaf,
	},
];

const leafGradients = [
	'from-emerald-200 to-emerald-400',
	'from-green-200 to-green-400',
	'from-lime-200 to-lime-400',
	'from-emerald-300 to-emerald-500',
	'from-green-300 to-green-500',
	'from-lime-300 to-lime-500',
	'from-emerald-400 to-emerald-600',
	'from-green-400 to-green-600',
	'from-lime-400 to-lime-600',
	'from-emerald-500 to-emerald-700',
];

function classNames(...xs) {
	return xs.filter(Boolean).join(' ');
}

function LeafBadge({ label, value }) {
	return (
		<div className='flex items-center gap-2 rounded-full px-3 py-1 shadow-sm bg-white/70 backdrop-blur border border-emerald-100'>
			<Leaf className='h-4 w-4' />
			<span className='text-xs font-medium text-emerald-900'>{label}:</span>
			<span className='text-xs text-emerald-800'>{value}</span>
		</div>
	);
}

function LeafCard({ item, index, side, onSelectEvent }) {
	const Icon = item.icon ?? Leaf;
	const gradient = leafGradients[index % leafGradients.length];
	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-100px' }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			className={classNames('relative w-full md:w-[calc(50%-2.5rem)]', side === 'left' ? 'md:mr-auto' : 'md:ml-auto')}
			aria-label={`Milestone ${item.year}: ${item.title}`}
		>
			<div
				className={classNames(
					'hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-1 rounded',
					side === 'left' ? 'right-[-2.5rem]' : 'left-[-2.5rem]',
					'bg-gradient-to-r from-emerald-600/80 to-emerald-400/80'
				)}
			/>
			<div
				className={classNames(
					'group relative overflow-hidden rounded-2xl border shadow-sm',
					'bg-gradient-to-br text-emerald-950',
					gradient
				)}
			>
				<div className='pointer-events-none absolute inset-0 opacity-15 mix-blend-multiply'>
					<svg viewBox='0 0 400 200' className='h-full w-full'>
						<defs>
							<linearGradient id={`leaf-lines-${item.year}`} x1='0' x2='1'>
								<stop offset='0%' stopColor='#065f46' stopOpacity='0.15' />
								<stop offset='100%' stopColor='#065f46' stopOpacity='0' />
							</linearGradient>
						</defs>
						<path
							d='M10,100 C90,10 310,10 390,100'
							stroke={`url(#leaf-lines-${item.year})`}
							strokeWidth='2'
							fill='none'
						/>
						<path
							d='M10,100 C90,190 310,190 390,100'
							stroke={`url(#leaf-lines-${item.year})`}
							strokeWidth='2'
							fill='none'
						/>
					</svg>
				</div>
				<div className='relative p-5 md:p-6'>
					<div className='flex items-center gap-3'>
						<div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow'>
							<Icon className='h-5 w-5 text-emerald-700' />
						</div>
						<div className='flex items-baseline gap-3'>
							<span className='text-2xl font-extrabold tracking-tight drop-shadow-sm'>{item.year}</span>
							<h3 className='text-lg md:text-xl font-semibold'>{item.title}</h3>
						</div>
					</div>
					<p className='mt-3 text-sm md:text-base leading-relaxed text-emerald-900/90'>{item.summary}</p>
					{item.metrics?.length > 0 && (
						<div className='mt-4 flex flex-wrap gap-2'>
							{item.metrics.map((m) => (
								<LeafBadge key={m.label} label={m.label} value={m.value} />
							))}
						</div>
					)}
					{item.events?.length > 0 && (
						<div className='mt-5 flex flex-wrap gap-2'>
							{item.events.map((ev) => (
								<button
									key={ev.id}
									onClick={() => onSelectEvent(item, ev)}
									className='px-3 py-1.5 rounded-full bg-white/80 hover:bg-white shadow-sm text-[11px] md:text-xs font-medium text-emerald-800 transition focus:outline-none focus:ring-2 focus:ring-emerald-500/60 flex items-center gap-1'
								>
									<Leaf className='h-3 w-3 opacity-70' /> {ev.title}
								</button>
							))}
						</div>
					)}
				</div>
				<div className='h-2 w-full bg-gradient-to-r from-white/20 via-white/40 to-white/10' />
			</div>
		</motion.div>
	);
}

export default function TreeOfGrowthTimeline({
	data = defaultData,
	heading = 'Our Efforts: 2016–2025',
	subheading = 'A decade of steady, sustainable growth powered by community and care.',
	modalMaxWidth = 'max-w-6xl', // widened default
}) {
	const { t } = useTranslation();
	const localizedHeading = t('timeline.heading');
	const localizedSubheading = t('timeline.subheading');
	const localizedClosingTitle = t('timeline.closing.title');
	const localizedClosingText = t('timeline.closing.text');
	const localizedData = useMemo(() => {
		return defaultData.map((item) => {
			const yearKey = `timeline.${item.year}`;
			const localizedEvents = (item.events ?? []).map((ev) => {
				const blocks = (ev.detailBlocks ?? []).map((block, i) => {
					if (block.type === 'subtitle') {
						return {
							...block,
							content: t(`${yearKey}.events.${ev.id}.blocks.${i}.content`, {
								defaultValue: block.content,
							}),
						};
					}
					if (block.type === 'text') {
						return {
							...block,
							content: t(`${yearKey}.events.${ev.id}.blocks.${i}.content`, {
								defaultValue: block.content,
							}),
						};
					}
					if (block.type === 'image') {
						return {
							...block,
							caption: t(`${yearKey}.events.${ev.id}.blocks.${i}.caption`, {
								defaultValue: block.caption ?? '',
							}),
						};
					}
					return block;
				});
				return {
					...ev,
					title: t(`${yearKey}.events.${ev.id}.title`, { defaultValue: ev.title }),
					detailBlocks: blocks,
				};
			});
			return {
				...item,
				title: t(`${yearKey}.title`, { defaultValue: item.title }),
				summary: t(`${yearKey}.summary`, { defaultValue: item.summary }),
				events: localizedEvents,
			};
		});
	}, [t]);
	const [active, setActive] = useState(null); // { yearItem, event }
	const close = useCallback(() => setActive(null), []);
	const escHandler = useCallback(
		(e) => {
			if (e.key === 'Escape') close();
		},
		[close]
	);
	useEffect(() => {
		if (active) {
			document.addEventListener('keydown', escHandler);
			return () => document.removeEventListener('keydown', escHandler);
		}
	}, [active, escHandler]);
	const initialFocusRef = useRef(null);
	useEffect(() => {
		if (active && initialFocusRef.current) initialFocusRef.current.focus();
	}, [active]);
	const onSelectEvent = (yearItem, event) => setActive({ yearItem, event });
	return (
		<section className='relative bg-emerald-50/60 py-32 md:py-40'>
			<div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-yellow-50/60 via-transparent to-transparent' />
			<div className='container mx-auto px-4 md:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mx-auto mb-12 max-w-3xl text-center'
				>
					<h2 className='text-3xl md:text-5xl font-extrabold tracking-tight text-emerald-900'>{localizedHeading}</h2>
					<p className='mt-4 text-emerald-900/80 md:text-lg'>{localizedSubheading}</p>
				</motion.div>
				<div className='relative'>
					<div
						aria-hidden
						className='pointer-events-none absolute left-1/2 top-0 -ml-0.5 h-full w-1 rounded-full bg-gradient-to-b from-emerald-800 via-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
					/>
					<div className='relative mx-auto grid gap-10 md:gap-16'>
						{(data === defaultData ? localizedData : data).map((item, idx) => {
							const side = idx % 2 === 0 ? 'left' : 'right';
							return (
								<div key={item.year} className='relative md:min-h-[7rem]'>
									<motion.div
										initial={{ scale: 0, opacity: 0 }}
										whileInView={{ scale: 1, opacity: 1 }}
										viewport={{ once: true, margin: '-80px' }}
										transition={{ duration: 0.4, ease: 'backOut' }}
										className='absolute left-1/2 top-10 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 h-4 w-4 rounded-full bg-emerald-700 ring-4 ring-emerald-200'
									/>
									<div
										className={classNames(
											'md:flex md:items-center md:gap-10',
											side === 'left' ? 'md:flex-row-reverse' : ''
										)}
									>
										<LeafCard item={item} index={idx} side={side} onSelectEvent={onSelectEvent} />
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<motion.div
					initial={{ opacity: 0, scale: 0.98 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='mt-16 rounded-3xl border bg-white/60 backdrop-blur px-6 py-10 text-center shadow-sm'
				>
					<div className='mx-auto flex max-w-2xl flex-col items-center gap-4'>
						<div className='flex -space-x-2'>
							{[...Array(8)].map((_, i) => (
								<div
									key={i}
									className='h-8 w-8 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 ring-2 ring-white'
								/>
							))}
						</div>
						<h3 className='text-2xl md:text-3xl font-bold text-emerald-900'>{localizedClosingTitle}</h3>
						<p className='text-emerald-900/80'>{localizedClosingText}</p>
					</div>
				</motion.div>
			</div>
			<AnimatePresence>
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-[60] overflow-y-auto bg-emerald-950/40 backdrop-blur-sm'
						aria-modal='true'
						role='dialog'
						onClick={close}
					>
						<div className='min-h-full flex items-center justify-center p-4'>
							<motion.div
								initial={{ scale: 0.92, opacity: 0, y: 32 }}
								animate={{ scale: 1, opacity: 1, y: 0 }}
								exit={{ scale: 0.94, opacity: 0, y: 16 }}
								transition={{ type: 'spring', stiffness: 200, damping: 24 }}
								className={`w-full max-w-[92vw] sm:max-w-3xl md:max-w-5xl ${modalMaxWidth} rounded-3xl border border-emerald-200/70 bg-white/95 p-6 sm:p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col max-h-[100vh] min-h-[60vh] md:min-h-[70vh]`}
								onClick={(e) => e.stopPropagation()}
							>
								<div className='pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl' />
								<div className='flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 relative'>
									<div>
										<h4 className='text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-emerald-900'>
											{active.event.title}
										</h4>
										<p className='mt-1 sm:mt-2 text-sm md:text-base text-emerald-800/80 font-medium'>
											Year {active.yearItem.year} • {active.yearItem.title}
										</p>
									</div>
									<button
										ref={initialFocusRef}
										onClick={close}
										className='rounded-full border border-emerald-300/70 bg-white/80 px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 shadow-sm self-start sm:self-auto'
										aria-label='Close dialog'
									>
										Close
									</button>
								</div>
								<div className='mt-6 text-sm md:text-base leading-relaxed text-emerald-900 max-w-4xl flex-1 overflow-y-auto pr-2 space-y-6'>
									{active.event.detailBlocks ? (
										active.event.detailBlocks.map((block, i) => {
											if (block.type === 'subtitle') {
												return (
													<h5 key={i} className='text-lg md:text-xl font-semibold text-emerald-800 tracking-tight'>
														{block.content}
													</h5>
												);
											}
											if (block.type === 'text') {
												return (
													<p key={i} className='whitespace-pre-line'>
														{block.content}
													</p>
												);
											}
											if (block.type === 'image') {
												return (
													<figure
														key={i}
														className='rounded-xl overflow-hidden border border-emerald-100 bg-white/70 shadow-sm backdrop-blur'
													>
														<img
															src={block.src}
															alt={block.alt || ''}
															loading='lazy'
															decoding='async'
															className='w-full h-auto object-cover'
														/>
														{block.caption && (
															<figcaption className='px-4 py-2 text-xs md:text-sm text-emerald-800/80 border-t border-emerald-100 bg-emerald-50/60'>
																{block.caption}
															</figcaption>
														)}
													</figure>
												);
											}
											return null;
										})
									) : (
										<p className='whitespace-pre-line'>{active.event.detail}</p>
									)}
								</div>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
