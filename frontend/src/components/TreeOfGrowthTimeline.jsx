import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, HeartHandshake, Droplets, HandCoins, Users } from 'lucide-react';

import imgBookshelf from '../pictures/2016-08/2016-1.jpg';
import imgPacked from '../pictures/2016-08/2016-2.jpg';
import imgShippment from '../pictures/2016-08/2016-3.jpg';
import imgArrival from '../pictures/2016-08/2016-4.jpg';
import imgBooksReady from '../pictures/2016-08/2016-5.jpg';
import imgBookCorner from '../pictures/2016-08/2016-6.jpg';
import imgHomeVisit from '../pictures/2016-08/2016-7.jpg';
import imgSchoolVisit from '../pictures/2016-08/2016-8.jpg';

import imgGather from '../pictures/2016-07/2016-1.jpg';
import imgCommunityEngagement from '../pictures/2016-07/2016-2.jpg';
import imgMoments from '../pictures/2016-07/2016-3.jpg';
import imgSupport from '../pictures/2016-07/2016-4.jpg';
import imgProfessional from '../pictures/2016-07/2016-5.jpg';

import imgBookDonationEvent from '../pictures/2016-05/2016-1.jpg';
import imgGrowRecognition from '../pictures/2016-05/2016-2.jpg';
import imgLessonsBeyondClassroom from '../pictures/2016-05/2016-3.jpg';
import imgConfidence from '../pictures/2016-05/2016-4.jpg';

import imgFuding1 from '../pictures/2017-Spring/2017-1.jpg';
import imgFuding2 from '../pictures/2017-Spring/2017-2.jpg';
import imgFuding3 from '../pictures/2017-Spring/2017-3.jpg';

import imgSichuan1 from '../pictures/2017-Winter/2017-1.jpg';
import imgSichuan2 from '../pictures/2017-Winter/2017-2.jpg';
import imgSichuan3 from '../pictures/2017-Winter/2017-3.jpg';

import imgCampusDonation_1 from '../pictures/2018-Spring/2018-1.jpg';
import imgCampusDonation_2 from '../pictures/2018-Spring/2018-2.jpg';

import imgKangbao1 from '../pictures/2018-Summer/2018-1.jpg';
import imgKangbao2 from '../pictures/2018-Summer/2018-2.jpg';
import imgKangbao3 from '../pictures/2018-Summer/2018-3.jpg';
import imgKangbao4 from '../pictures/2018-Summer/2018-4.jpg';

import imgKangbaoMeet1 from '../pictures/xiaokangbao/pic1.jpg';
import imgKangbaoMeet2 from '../pictures/xiaokangbao/pic2.jpg';
import imgKangbaoSmile1 from '../pictures/xiaokangbao/pic3.jpg';
import imgKangbaoSmile2 from '../pictures/xiaokangbao/pic4.jpg';
import imgKangbaoChristmas1 from '../pictures/xiaokangbao/pic5.jpg';
import imgKangbaoChristmas2 from '../pictures/xiaokangbao/pic6.jpg';
import imgKangbaoThankYou1 from '../pictures/xiaokangbao/pic7.jpg';
import imgKangbaoThankYou2 from '../pictures/xiaokangbao/pic8.jpg';

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
					{ type: 'subtitle', content: 'Visiting Sponsored Students' },
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
		summary: 'Expanded sponsorship model; introduced volunteer mentorship for youth.',
		events: [
			{
				id: '2019-kangbao-fourth-visit',
				title: '2019-summmer kangbao-fourth-visit',
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

					{ type: 'subtitle', content: 'Love Helps Growth — No Child Left Alone' },
					{
						type: 'text',
						content:
							'This visit was part of the Kangbao County Women’s Federation’s third round of the program “Love Helps Growth, No Child Left Alone,” which focuses on pairing and supporting left-behind children. Despite his busy schedule, County Mayor Li personally attended the event, listened carefully to the introductions from the “loving families,” and learned about the origin and development of Little Green Leaves. He expressed strong affirmation and encouragement.',
					},
					{
						type: 'text',
						content:
							'During the event, I was also honored to meet Ms. Fan Weihua, Chairwoman of Zhangjiakou Zhangheng Big Sister Domestic Services Co., Ltd., and Ms. Zhang Jing, Chairwoman of Hebei Hengtai Leather Goods Co., Ltd. Listening to their stories of helping children in need deeply moved me. I sincerely applaud these two compassionate leaders for their generosity and dedication.',
					},

					{ type: 'subtitle', content: 'Standing Beneath the Flag' },
					{
						type: 'text',
						content:
							'When I once again put on the red Young Pioneer scarf and watched the national flag rise slowly in the hands of the students, I felt deeply moved. My love for this country is not only rooted in family, food, and beautiful scenery — but also in the pride that comes from its strength. Behind us stands a powerful nation we can rely on, giving us confidence and peace of mind. I believe every international student shares this same feeling.',
					},
					{
						type: 'text',
						content:
							'Little Green Leaves shared its own growth story with the students and spoke to them about the power of dreams. I hope every child can discover their own dream — and let it become the driving force that pushes them forward.',
					},

					{ type: 'subtitle', content: 'A Meaningful Beginning' },
					{
						type: 'text',
						content:
							'I sincerely invited Chairwoman Liang to serve as an “Ambassador of Love” for the Little Green Leaves Volunteer Alliance. She happily accepted. This was the very first invitation we have ever extended — and we believe it marks a beautiful beginning.',
					},

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

					{ type: 'subtitle', content: 'Gratitude and Strength' },
					{
						type: 'text',
						content:
							'Little Green Leaves brought warmth, passed on care, and received strength from leaders, loving families, and students alike. I am deeply grateful for the opportunity to sow seeds of kindness — and thankful for the motivation that continues to push me forward on this journey.',
					},
				],
			},

			{
				id: '2019-2',
				title: 'Sponsorship Expansion',
				detail: 'Added recurring sponsor tiers increasing retention and long-term stability.',
			},
		],
		icon: Users,
	},
	{
		year: 2020,
		title: 'Weathering the Storm',
		summary: 'Emergency relief and remote distribution during global disruptions; kept programs running.',
		events: [
			{
				id: '2020-1',
				title: 'Remote Learning Kits',
				detail: 'Distributed printed lesson packs and radios to continue studies during school closures.',
			},
			{
				id: '2020-2',
				title: 'Relief Logistics Hub',
				detail: 'Created a local storage and dispatch hub ensuring supply continuity.',
			},
		],
		icon: Leaf,
	},
	{
		year: 2021,
		title: 'New Growth Rings',
		summary: 'Launched digital donation platform and transparency dashboard.',
		events: [
			{
				id: '2021-1',
				title: 'Donation Platform',
				detail: 'Deployed a scalable online portal lowering transaction friction.',
			},
			{
				id: '2021-2',
				title: 'Impact Dashboard',
				detail: 'Live dashboard introduced for real-time project progress tracking.',
			},
		],
		icon: HandCoins,
	},

	{
		year: 2022,
		title: 'Branching Out',
		summary: 'Cross-border partnerships; added maternal health and micro‑enterprise tracks.',
		events: [
			{
				id: '2022-1',
				title: 'Maternal Health Pilot',
				detail: 'Partnered with clinics to provide prenatal nutrition support.',
			},
			{
				id: '2022-2',
				title: 'Micro-Enterprise Track',
				detail: 'Seed capital and coaching for 20 women-led cooperatives.',
			},
		],
		icon: HeartHandshake,
	},
	{
		year: 2023,
		title: 'Deep Roots',
		summary: 'Impact audits show sustained outcomes in education, water access, and incomes.',
		events: [
			{
				id: '2023-1',
				title: 'Third-Party Audit',
				detail: 'Independent review validated multi-year literacy improvements.',
			},
			{
				id: '2023-2',
				title: 'Income Impact Study',
				detail: 'Household survey showed 31% median increase linked to program synergy.',
			},
		],
		icon: Users,
	},
	{
		year: 2024,
		title: 'Forest of Allies',
		summary: 'Corporate matching and local stewardship councils accelerate scale.',
		events: [
			{
				id: '2024-1',
				title: 'Stewardship Councils',
				detail: 'Formed 22 local councils guiding resource allocation and oversight.',
			},
			{
				id: '2024-2',
				title: 'Corporate Matching Wave',
				detail: 'Secured multi-year matching agreements expanding donor leverage.',
			},
		],
		icon: Leaf,
	},

	{
		year: 2025,
		title: 'A Greener World, Together',
		summary: 'Culmination of the 10‑year journey — milestones in health, water, education, and livelihoods.',
		events: [
			{
				id: '2025-1',
				title: 'Decade Celebration Summit',
				detail: 'Hosted cross-region summit aligning on next decade impact roadmap.',
			},
			{
				id: '2025-2',
				title: 'Sustainability Charter',
				detail: 'Ratified environmental & governance charter for long-term stewardship.',
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
					<h2 className='text-3xl md:text-5xl font-extrabold tracking-tight text-emerald-900'>{heading}</h2>
					<p className='mt-4 text-emerald-900/80 md:text-lg'>{subheading}</p>
				</motion.div>
				<div className='relative'>
					<div
						aria-hidden
						className='pointer-events-none absolute left-1/2 top-0 -ml-0.5 h-full w-1 rounded-full bg-gradient-to-b from-emerald-800 via-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
					/>
					<div className='relative mx-auto grid gap-10 md:gap-16'>
						{data.map((item, idx) => {
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
						<h3 className='text-2xl md:text-3xl font-bold text-emerald-900'>Together, we’ve grown a greener world</h3>
						<p className='text-emerald-900/80'>
							From a single seed in 2016 to a thriving forest of impact in 2025 — thank you to everyone who nurtured
							this growth.
						</p>
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
								className={`w-full ${modalMaxWidth} rounded-3xl border border-emerald-200/70 bg-white/95 p-12 md:p-20 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col max-h-[100vh] min-h-[70vh]`}
								onClick={(e) => e.stopPropagation()}
							>
								<div className='pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl' />
								<div className='flex items-start justify-between gap-4 relative'>
									<div>
										<h4 className='text-2xl md:text-3xl font-extrabold tracking-tight text-emerald-900'>
											{active.event.title}
										</h4>
										<p className='mt-2 text-sm md:text-base text-emerald-800/80 font-medium'>
											Year {active.yearItem.year} • {active.yearItem.title}
										</p>
									</div>
									<button
										ref={initialFocusRef}
										onClick={close}
										className='rounded-full border border-emerald-300/70 bg-white/80 px-6 py-3 text-xs font-medium text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 shadow-sm'
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
														<img src={block.src} alt={block.alt || ''} className='w-full h-auto object-cover' />
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
