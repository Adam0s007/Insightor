--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-2.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-2.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.article (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "imgUrl" text,
    rating real DEFAULT '0'::real NOT NULL,
    "reviewsCount" integer DEFAULT 0 NOT NULL,
    "userId" uuid
);


ALTER TABLE public.article OWNER TO postgres;

--
-- Name: article_categories_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.article_categories_category (
    "articleId" uuid NOT NULL,
    "categoryId" uuid NOT NULL
);


ALTER TABLE public.article_categories_category OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    email text NOT NULL,
    message text NOT NULL
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- Name: content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type character varying NOT NULL,
    value character varying NOT NULL,
    "articleId" uuid
);


ALTER TABLE public.content OWNER TO postgres;

--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    content text NOT NULL,
    rating real NOT NULL,
    "userId" uuid,
    "articleId" uuid
);


ALTER TABLE public.review OWNER TO postgres;

--
-- Name: review_downvotes_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review_downvotes_user (
    "reviewId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.review_downvotes_user OWNER TO postgres;

--
-- Name: review_upvotes_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review_upvotes_user (
    "reviewId" uuid NOT NULL,
    "userId" uuid NOT NULL
);


ALTER TABLE public.review_upvotes_user OWNER TO postgres;

--
-- Name: socials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.socials (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    facebook text,
    twitter text,
    youtube text,
    instagram text,
    linkedin text,
    "userId" uuid
);


ALTER TABLE public.socials OWNER TO postgres;

--
-- Name: unverifiedUser; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."unverifiedUser" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    "verificationCode" character varying NOT NULL
);


ALTER TABLE public."unverifiedUser" OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    description text,
    "profilePicture" text,
    "socialsId" uuid
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.article (id, date, title, description, "imgUrl", rating, "reviewsCount", "userId") FROM stdin;
446fdfd5-594f-428f-8ca6-30213ee27071	2023-09-29 16:00:56.882907	Harvesting the Tides: Advancements and Prospects of Tidal Energy in 2023	Journey into the depths of tidal energy innovations in 2023, as we uncover the advancements and applications making waves in renewable energy. Explore the intersection of technology and nature, the impact on global sustainability, and insights from experts in the field, including myself, on the future of tidal power.	95c5be65-cffe-4053-b513-c5be6689b512.jpg	4	1	db8ed89a-b373-4f9d-acac-e80ef9d533fd
1ff4247b-dfbe-48d0-83ca-6305dcd97424	2023-09-29 16:06:56.834362	Digital Frontiers: The Evolution of Cybersecurity in 2023	Explore the digital battleground of cybersecurity in 2023 with Artur Kowalski, as he unveils the latest advancements, emerging threats, and defense strategies that are shaping the future of online security and data protection.	fd59f74f-fe14-43d2-ae62-fab3fafc24cb.jpg	3.5	2	6af49e69-d7f8-49eb-8b72-7c282ddfee23
80020635-5cdb-4294-8874-c7dd38adc28c	2023-09-29 15:54:50.698936	Unlocking The Green Future: Solar Power Technologies to Watch in 2023	Explore the emerging trends and innovations in solar power technology in 2023, driving sustainability and a cleaner, greener future. Dive into the potential impacts on the environment, economy, and our daily lives, featuring insights from industry experts and real-world applications.	337383a2-8bc4-45ff-863f-456bbc37fd9a.jpg	4	1	db8ed89a-b373-4f9d-acac-e80ef9d533fd
3cc210ce-9fe5-4c73-8f69-d93110d1ebc4	2023-09-29 15:58:42.399444	Empowering Sustainability: The Rise of Wind Energy in 2023	Delve into the rapid advancements and adoption of wind energy in 2023, as we explore its transformative impact on environmental conservation, economic landscapes, and global energy narratives. Join us in examining industry breakthroughs, real-world applications, and expert insights into the future of wind power.	d0154b92-b7e6-4970-b21c-9bc1a80305ef.jpg	5	1	db8ed89a-b373-4f9d-acac-e80ef9d533fd
7d56227d-e865-40ac-a071-afe07cb0271f	2023-09-29 16:08:32.609422	AI and Ethics: Navigating the Moral Compass of Artificial Intelligence	Join Artur Kowalski on a philosophical journey through the ethical landscape of Artificial Intelligence, exploring the moral implications, societal impacts, and the quest for responsible AI development in the 21st century.	26ef297e-1a3d-46f9-8aae-622ef1d4e918.jpg	0	0	6af49e69-d7f8-49eb-8b72-7c282ddfee23
b66de379-5f00-4fd1-abae-7d05d2d2dbcf	2023-09-29 16:12:34.68779	Exploring Virtual Realities: The Integration and Impact of VR in Modern Education	Venture into the immersive world of Virtual Reality with Artur Kowalski as we examine its transformative role in education. Discover the opportunities, challenges, and the evolving synergy between virtual experiences and educational paradigms.	50f46aef-a155-47a3-a954-51216dc5120d.jpg	2.5	2	6af49e69-d7f8-49eb-8b72-7c282ddfee23
597a8554-75ae-4871-a101-360c959372f9	2023-09-29 16:29:20.402068	Whispers of the Cosmos: Unveiling the Mysteries of Dark Matter	Embark on a journey through the unseen fabric of the universe as we explore the enigmatic substance known as Dark Matter. This article delves into our current understanding, ongoing research, and the potential implications of unraveling the secrets of this cosmic phenomenon.	c592694f-67c8-48b7-a749-295a19da7aa7.jpg	0	0	ba63be24-7e14-499c-a51a-bf19d8f28746
\.


--
-- Data for Name: article_categories_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.article_categories_category ("articleId", "categoryId") FROM stdin;
80020635-5cdb-4294-8874-c7dd38adc28c	13e1c347-3b7e-4499-88de-6505cd697ced
80020635-5cdb-4294-8874-c7dd38adc28c	473030d3-05ba-473c-8770-9e82a2e480ee
80020635-5cdb-4294-8874-c7dd38adc28c	b7891d1d-6756-4ffa-b72f-7e4739496211
80020635-5cdb-4294-8874-c7dd38adc28c	a927b6f2-f97f-4438-9f08-2c0112c0461b
3cc210ce-9fe5-4c73-8f69-d93110d1ebc4	473030d3-05ba-473c-8770-9e82a2e480ee
3cc210ce-9fe5-4c73-8f69-d93110d1ebc4	b7891d1d-6756-4ffa-b72f-7e4739496211
3cc210ce-9fe5-4c73-8f69-d93110d1ebc4	1444ad3e-b292-4706-bbe0-6af67b01c36e
3cc210ce-9fe5-4c73-8f69-d93110d1ebc4	27741847-d4b6-4dc3-a2ea-113b8499dd4e
446fdfd5-594f-428f-8ca6-30213ee27071	473030d3-05ba-473c-8770-9e82a2e480ee
446fdfd5-594f-428f-8ca6-30213ee27071	b7891d1d-6756-4ffa-b72f-7e4739496211
446fdfd5-594f-428f-8ca6-30213ee27071	566dbce3-d087-423c-a2e1-101b00377fa5
446fdfd5-594f-428f-8ca6-30213ee27071	cad10e8b-f53d-4901-b3e4-32b7f42f051f
1ff4247b-dfbe-48d0-83ca-6305dcd97424	807aec9a-ead3-4fa5-b52e-34b429905fd2
1ff4247b-dfbe-48d0-83ca-6305dcd97424	e631b8d9-b35f-4a6e-b7c6-d45e17a49fec
1ff4247b-dfbe-48d0-83ca-6305dcd97424	7a95ee36-0b1e-4392-9ef1-d510f7a539bf
7d56227d-e865-40ac-a071-afe07cb0271f	3670d501-5d96-4f64-9792-208f9c0c69d5
7d56227d-e865-40ac-a071-afe07cb0271f	42f4f56a-53c2-43ba-933e-788e7725d8d1
7d56227d-e865-40ac-a071-afe07cb0271f	b46c0a4e-3981-4e34-93d3-db4f98504e4b
b66de379-5f00-4fd1-abae-7d05d2d2dbcf	16333136-f6eb-4f85-8e3c-1bd191dd6378
b66de379-5f00-4fd1-abae-7d05d2d2dbcf	f6072561-dca8-4e5e-9ed1-fb9bf54bc72d
b66de379-5f00-4fd1-abae-7d05d2d2dbcf	65fc6412-85c5-4d07-9deb-0710b1393747
597a8554-75ae-4871-a101-360c959372f9	65fc6412-85c5-4d07-9deb-0710b1393747
597a8554-75ae-4871-a101-360c959372f9	69b1b6b0-bcc7-4ca2-aa85-0d5c8ddeb6c7
597a8554-75ae-4871-a101-360c959372f9	83a4b93e-0e67-4b60-97d7-cea2b656570b
597a8554-75ae-4871-a101-360c959372f9	7dcc027b-80f9-4691-be42-68daf26b2401
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
13e1c347-3b7e-4499-88de-6505cd697ced	SolarPower
473030d3-05ba-473c-8770-9e82a2e480ee	RenewableEnergy
b7891d1d-6756-4ffa-b72f-7e4739496211	Sustainability
a927b6f2-f97f-4438-9f08-2c0112c0461b	Environment
1444ad3e-b292-4706-bbe0-6af67b01c36e	WindEnergy
27741847-d4b6-4dc3-a2ea-113b8499dd4e	EconomicOpportunity
566dbce3-d087-423c-a2e1-101b00377fa5	TidalEnergy
cad10e8b-f53d-4901-b3e4-32b7f42f051f	EconomicDevelopment
807aec9a-ead3-4fa5-b52e-34b429905fd2	Cybersecurity
e631b8d9-b35f-4a6e-b7c6-d45e17a49fec	OnlineSecurity
7a95ee36-0b1e-4392-9ef1-d510f7a539bf	ComputerScience
3670d501-5d96-4f64-9792-208f9c0c69d5	ArtificialIntelligence
42f4f56a-53c2-43ba-933e-788e7725d8d1	ResponsibleDevelopment
b46c0a4e-3981-4e34-93d3-db4f98504e4b	SocietalImpact
16333136-f6eb-4f85-8e3c-1bd191dd6378	VirtualReality
f6072561-dca8-4e5e-9ed1-fb9bf54bc72d	EducationTechnology
65fc6412-85c5-4d07-9deb-0710b1393747	Education
69b1b6b0-bcc7-4ca2-aa85-0d5c8ddeb6c7	Cosmology
83a4b93e-0e67-4b60-97d7-cea2b656570b	Universe
7dcc027b-80f9-4691-be42-68daf26b2401	DarkMatter
\.


--
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact (id, created, email, message) FROM stdin;
\.


--
-- Data for Name: content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content (id, type, value, "articleId") FROM stdin;
02d358f2-eeaa-4376-8eb7-7d0298c3c9e3	editor	<h2><strong>Emerging Technologies and Innovations</strong></h2><p>2023 has witnessed an array of groundbreaking advancements in solar power technology. Leading the pack is Perovskite solar cells, heralded for their higher efficiency and lower production costs compared to traditional silicon cells. Additionally, Bifacial solar panels, capable of capturing sunlight from both sides, are gaining traction for their increased energy yield.</p>	80020635-5cdb-4294-8874-c7dd38adc28c
3c943384-4612-4feb-999f-7b348817a1da	editor	<h2><strong>Emerging Technologies and Innovations</strong></h2><p>2023 has witnessed an array of groundbreaking advancements in solar power technology. Leading the pack is Perovskite solar cells, heralded for their higher efficiency and lower production costs compared to traditional silicon cells. Additionally, Bifacial solar panels, capable of capturing sunlight from both sides, are gaining traction for their increased energy yield.</p>	80020635-5cdb-4294-8874-c7dd38adc28c
1e789fb6-ffc9-4764-8d52-db98fc0de19a	image	https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBjZWxsc3xlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&w=1000&q=60	80020635-5cdb-4294-8874-c7dd38adc28c
521404a9-8174-48fc-a0a8-705829b3b3da	editor	<h2><strong>Economic and Environmental Impact</strong></h2><p>The integration of these advanced technologies is poised to revolutionize the energy sector, offering a viable alternative to fossil fuels. Experts predict a surge in solar energy adoption, leading to significant reductions in CO2 emissions and fostering economic growth through job creation in the renewable energy sector.</p><h2><strong>Real-World Applications and Case Studies</strong></h2><p>Around the world, nations are embracing solar power to meet their energy needs. In arid regions, solar-powered water pumps are bringing life-sustaining water to remote communities. Meanwhile, large-scale solar farms are cropping up, showcasing the capability of solar energy to power entire cities sustainably.</p><h2><strong>Expert Insights and Future Outlook</strong></h2><p>Industry experts are optimistic about the future of solar power, with advancements in storage technology, such as solid-state batteries, playing a pivotal role. The synergy between enhanced energy storage and solar power generation holds the promise of a greener, more sustainable future for all.</p>	80020635-5cdb-4294-8874-c7dd38adc28c
001e2369-de1a-4e01-8d84-1e8a2b5f3ec0	paragraph	In conclusion, the year 2023 marks a significant milestone in the journey towards a solar-powered world. The amalgamation of innovative technologies, environmental consciousness, and economic incentives is fueling the shift towards renewable energy, shining a light on the path to a sustainable future.	80020635-5cdb-4294-8874-c7dd38adc28c
6dcf1157-b19f-412a-a6d4-b63273c23c7e	paragraph	In the vibrant tapestry of renewable energy, wind power emerges as a key player in shaping a sustainable, eco-friendly future. With its ability to harness the natural, abundant force of wind, this form of energy represents a cornerstone in the global endeavor to reduce carbon footprints and mitigate climate change.	3cc210ce-9fe5-4c73-8f69-d93110d1ebc4
a36ffc01-4a57-4020-8a83-52ae0aab0106	editor	<h2><strong>Technological Breakthroughs and Advancements</strong></h2><p>2023 is a hallmark year for wind energy, witnessing the advent of groundbreaking technologies such as airborne wind energy systems and enhanced energy storage solutions. These innovations are pushing the boundaries of what's possible, offering higher efficiency, reduced costs, and greater adaptability to diverse environments.</p><h2><strong>Economic Dynamics and Environmental Implications</strong></h2><p>The proliferation of wind energy is redefining economic and environmental paradigms. As countries invest in wind infrastructure, we are seeing a boom in green jobs, fostering economic resilience. Concurrently, the reduction in greenhouse gas emissions is contributing to cleaner air, healthier ecosystems, and a more balanced climate.</p>	3cc210ce-9fe5-4c73-8f69-d93110d1ebc4
026ad9e3-8b64-4824-8262-7395bcecf11a	editor	<h2><strong>Global Adoption and Case Studies</strong></h2><p>From the rolling hills of Europe to the vast plains of North America, wind energy is being embraced on a global scale. Innovative projects such as offshore wind farms and community-led initiatives are illuminating the versatility and scalability of wind power, catering to both urban and remote energy needs.</p><h2><strong>Expert Perspectives and Future Trajectory</strong></h2><p>Industry specialists, including myself, are enthusiastic about the prospects of wind energy. With ongoing research in materials science and aerodynamics, we anticipate further enhancements in turbine efficiency and energy capture. The integration of artificial intelligence and predictive analytics is set to revolutionize maintenance and optimize performance.</p>	3cc210ce-9fe5-4c73-8f69-d93110d1ebc4
ff38627f-5f63-4849-828d-c4764a4f1f29	paragraph	To sum up, 2023 stands as a pivotal year for wind energy, spotlighting its potential to reshape our energy landscape. The fusion of cutting-edge technology, economic opportunity, and environmental stewardship is propelling us towards a future where wind power is a pillar of global energy solutions.	3cc210ce-9fe5-4c73-8f69-d93110d1ebc4
842bc1d1-0593-49fa-b427-a8e254a76ca2	paragraph	As we navigate towards a cleaner and more sustainable future, tidal energy emerges as a potent and reliable contributor to the renewable energy portfolio. Utilizing the gravitational dance between the Earth and the Moon, tidal power offers a predictable and consistent source of energy, primed for innovation and growth.	446fdfd5-594f-428f-8ca6-30213ee27071
9d66f3d8-2379-4811-aa97-6491baf91faf	editor	<h2><strong>Innovative Technologies and Developments</strong></h2><p>2023 marks a significant chapter in tidal energy, with the introduction of technologies such as Oscillating Water Columns and Tidal Kites. These advancements are enhancing energy conversion rates, reducing operational costs, and allowing for the exploration of new locations for tidal energy harvesting.</p><h2><strong>Environmental and Economic Ripple Effects</strong></h2><p>The adoption of tidal energy is creating waves of change across environmental and economic landscapes. It stands as a testament to balancing energy generation with ecosystem preservation, while simultaneously driving investment and creating employment opportunities in the green energy sector.</p><h2><strong>Global Implementation and Success Stories</strong></h2><p>Across the globe, from the coastlines of the United Kingdom to the shores of Canada, tidal energy projects are demonstrating the versatility and adaptability of this renewable source. The successful integration of tidal power plants is showcasing the potential to meet diverse energy demands while mitigating environmental impacts.</p>	446fdfd5-594f-428f-8ca6-30213ee27071
a49c0c64-cada-4d42-9379-77db05a18cd1	image	https://images.unsplash.com/photo-1468787737698-f5c03f0570dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1030&q=80	446fdfd5-594f-428f-8ca6-30213ee27071
7a9a9ca5-244e-40bf-a40f-31506f064a71	editor	<h2><strong>Expert Reflections and Looking Ahead</strong></h2><p>As a renewable energy advocate and researcher, I see a sea of possibilities for tidal energy. The exploration of materials science, hydraulic engineering, and real-time data analytics is paving the way for optimized efficiency and sustainable growth. The horizon looks promising, with tidal energy poised to play a crucial role in the global energy transition.</p>	446fdfd5-594f-428f-8ca6-30213ee27071
63da330c-de4e-4b2d-93bb-91ef48bed594	paragraph	In conclusion, 2023 is a landmark year for tidal energy, highlighting its capabilities and contributions to renewable energy. The synergy of technological innovation, environmental conservation, and economic development is steering us towards a future where the energy of the tides is integral to powering our world.	446fdfd5-594f-428f-8ca6-30213ee27071
c191fc3a-1813-4ee5-b62c-518bda128363	paragraph	In the interconnected tapestry of the digital world, cybersecurity stands as the guardian of information integrity and privacy. As we tread deeper into the information age, the complexity and sophistication of cyber threats evolve, necessitating adaptive and robust defense mechanisms.	1ff4247b-dfbe-48d0-83ca-6305dcd97424
104034c2-377e-4d76-810e-9c544dd472cf	editor	<h2><strong>Advancements and Innovations</strong></h2><p>2023 marks a paradigm shift in cybersecurity, witnessing the rise of Quantum Encryption and Artificial Intelligence-driven defense protocols. These technologies are at the forefront, fortifying digital infrastructures against unprecedented levels of cyber threats and vulnerabilities.</p><h2><strong>Emerging Threats and Challenges</strong></h2><p>With innovation comes adversity. The digital landscape is witnessing the emergence of sophisticated attack vectors, including Deepfake Phishing and IoT-based attacks, challenging the conventional boundaries of cybersecurity and demanding novel countermeasures.</p><h2><strong>Strategies and Best Practices</strong></h2><p>Proactive defense is the cornerstone of effective cybersecurity. The adoption of Multi-Factor Authentication, Risk-Based Vulnerability Management, and Zero Trust Architecture is gaining momentum, reflecting a strategic shift towards resilience and adaptability in the face of evolving threats.</p>	1ff4247b-dfbe-48d0-83ca-6305dcd97424
37a4d9f1-7334-43fc-97e2-4b716a3080a9	paragraph	In conclusion, the evolution of cybersecurity in 2023 is characterized by innovation, challenge, and adaptation. The continuous pursuit of security excellence is vital in safeguarding the digital frontier and ensuring the integrity of our interconnected world.	1ff4247b-dfbe-48d0-83ca-6305dcd97424
c7e94ce0-c83a-4296-a452-3383c463bd57	paragraph	As Artificial Intelligence (AI) permeates every facet of our society, the ethical considerations surrounding its development and application become paramount. Balancing technological progress with moral responsibility is a delicate dance, necessitating reflection, dialogue, and action.	7d56227d-e865-40ac-a071-afe07cb0271f
8f3d9f47-1528-4f8e-ace2-13a4bb530723	editor	<h2><strong>Moral Implications and Dilemmas</strong></h2><p>AI presents a myriad of ethical challenges, from algorithmic bias to autonomous decision-making. The moral fabric of AI development is being tested, prompting a re-evaluation of values, accountability, and the very essence of what it means to be human.</p><h2><strong>Societal Impacts and Responsibilities</strong></h2><p>The societal ramifications of AI are vast and multifaceted. The integration of AI into healthcare, education, and the workforce raises questions about equity, access, and the potential exacerbation of societal divides. The onus is on developers, policymakers, and society at large to navigate these uncharted waters with foresight and empathy.</p><h2><strong>The Path Forward: Responsible AI Development</strong></h2><p>The pursuit of ethically sound AI is a collective endeavor. Fostering interdisciplinary collaboration, promoting transparency, and advocating for regulatory frameworks are pivotal steps in ensuring the responsible evolution of AI technologies.</p>	7d56227d-e865-40ac-a071-afe07cb0271f
e928818a-9b4d-4c97-9514-05ecdd840cf7	paragraph	In closing, the intersection of AI and ethics is a dynamic and evolving discourse. The journey towards responsible AI is one of reflection, responsibility, and relentless pursuit of a harmonious balance between technological advancement and moral integrity.	7d56227d-e865-40ac-a071-afe07cb0271f
2b8fb986-232b-4d57-af66-45af65eb80f9	paragraph	In the kaleidoscope of technological evolution, Virtual Reality (VR) stands as a beacon of transformative potential, particularly in the realm of education. This immersive technology is redefining the boundaries of learning, creating experiences that are interactive, engaging, and boundless.	b66de379-5f00-4fd1-abae-7d05d2d2dbcf
903079d6-8d8c-4485-b19d-922a4409090c	editor	<h2><strong>Integration and Opportunities</strong></h2><p>The integration of VR in educational settings is opening doors to unprecedented learning opportunities. From virtual field trips to simulated lab experiments, students are able to explore, interact, and learn in ways that were once the stuff of science fiction.</p>	b66de379-5f00-4fd1-abae-7d05d2d2dbcf
d77b69c9-fb66-4368-8c6d-b51b76641d69	image	https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80	b66de379-5f00-4fd1-abae-7d05d2d2dbcf
c1c223b8-b5e3-4634-b251-97b46af5680d	editor	<h2><strong>Challenges and Considerations</strong></h2><p>While the prospects of VR in education are immense, it is not without its challenges. Issues such as accessibility, content quality, and the potential for information overload necessitate careful consideration and thoughtful implementation.</p><h2><strong>Evolving Educational Paradigms</strong></h2><p>The synergy between VR and education is reshaping pedagogical paradigms. The focus is shifting towards experiential learning, fostering creativity, critical thinking, and a deeper understanding of complex subjects. The role of educators is also evolving, transitioning from traditional instructors to facilitators of immersive learning experiences.</p>	b66de379-5f00-4fd1-abae-7d05d2d2dbcf
643572eb-b673-42e2-ae22-cf791ba7c21a	paragraph	In conclusion, the journey of integrating Virtual Reality in education is one of exploration and transformation. The opportunities are vast, the challenges are surmountable, and the potential impact on learning is boundless. As we navigate this virtual frontier, the future of education appears more immersive and interactive than ever before.	b66de379-5f00-4fd1-abae-7d05d2d2dbcf
90859fe1-d14c-4d05-870a-f07d1ac85625	paragraph	The universe, vast and mysterious, holds secrets that have perplexed humanity for centuries. One such enigma is Dark Matter, an invisible substance that, while undetectable, exerts gravitational effects on visible matter, radiation, and the structure of the universe. Comprising approximately 27% of the universe, Dark Matter remains one of the most elusive and intriguing puzzles in the field of cosmology.	597a8554-75ae-4871-a101-360c959372f9
ffecb643-9428-4798-8eac-b10e527fcf07	editor	<h2><strong>The Unseen Architect:</strong></h2><p>Dark Matter does not emit, absorb, or reflect light, making it invisible and detectable only through its gravitational effects. Its presence is inferred by the gravitational pull it exerts on galaxies, bending the path of light and influencing the cosmic web structure. Dark Matter acts as the unseen architect, shaping the visible universe and holding galaxies together.</p><h2><strong>Hunt for the Invisible:</strong></h2><p>Scientists around the globe are engaged in a relentless pursuit to understand the nature of Dark Matter. Cutting-edge experiments, both on Earth and in space, aim to detect Dark Matter particles and study their properties. Collaborative efforts, such as the Large Hadron Collider and the Dark Energy Survey, are pushing the boundaries of our knowledge, seeking to unveil the mysteries of this invisible substance.</p><h2><strong>Potential Implications:</strong></h2><p>Unraveling the secrets of Dark Matter could revolutionize our understanding of the universe and lead to groundbreaking discoveries in fundamental physics. It holds the potential to unlock new dimensions, challenge established theories, and pave the way for advancements in technology and energy.</p>	597a8554-75ae-4871-a101-360c959372f9
8ec9dc94-eaf9-4d9a-86ae-2d2629f241fa	paragraph	Dark Matter, the elusive whisperer of cosmic tales, continues to be a focal point of scientific exploration. As we stand on the precipice of discovery, the quest to understand this mysterious substance promises to shed light on the darkest corners of the universe and redefine our cosmic narrative.	597a8554-75ae-4871-a101-360c959372f9
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id, created, content, rating, "userId", "articleId") FROM stdin;
23448d28-9bb8-49b1-9861-80781a5d171e	2023-09-29 16:03:07.369011	This article stands as a comprehensive guide to the evolving world of solar power technologies. Anna GreenÔÇÖs adept exploration of innovations like Perovskite solar cells and Bifacial solar panels is enlightening and thorough. The content is enriched with real-world applications and forecasts, providing readers with a panoramic view of solar energy prospects. While the article is incredibly informative, a more in-depth exploration of the challenges facing these technologies would have provided a more balanced perspective.	4	ba63be24-7e14-499c-a51a-bf19d8f28746	80020635-5cdb-4294-8874-c7dd38adc28c
9908f953-52f0-4452-a0ca-d80aba10e2d0	2023-09-29 16:03:27.582356	Anna Green outdoes herself in this exemplary piece on wind energy. The article seamlessly intertwines technological advancements, economic implications, and global adoption narratives, painting a holistic picture of the wind energy sector. Each section is meticulously researched, with images enhancing the overall reader experience. The expert insights and forward-looking statements culminate in a compelling argument for the role of wind energy in our sustainable future. A well-rounded and thought-provoking read that earns a full five stars.	5	ba63be24-7e14-499c-a51a-bf19d8f28746	3cc210ce-9fe5-4c73-8f69-d93110d1ebc4
c809f5da-3d0c-47c3-9fd7-7089b2368319	2023-09-29 16:18:36.257296	Artur KowalskiÔÇÖs ÔÇťExploring Virtual RealitiesÔÇŁ presents an engaging glimpse into the potential of VR in education, shedding light on both its transformative possibilities and inherent challenges. While the article is brimming with enthusiasm for VRÔÇÖs role in reshaping learning experiences, it occasionally skims the surface of the subject. A deeper exploration of real-world implementations and case studies would have added much-needed depth and practicality. The discussion on evolving educational paradigms is insightful, but a more comprehensive analysis of the implications of VR on different educational levels and settings would have been beneficial. Overall, KowalskiÔÇÖs piece serves as a stimulating, albeit somewhat generalized, introduction to the intersection of VR and education.	3	db8ed89a-b373-4f9d-acac-e80ef9d533fd	b66de379-5f00-4fd1-abae-7d05d2d2dbcf
39f38679-00d4-4cf7-a6b3-77eb0a85f30e	2023-09-29 16:17:27.871801	Artur Kowalski presents a thought-provoking examination of the current state of Cybersecurity. He successfully unravels the complexities of emerging threats and the advancements made to counteract them. The article offers a balanced view of the innovations and challenges, providing readers with a comprehensive understanding of the Cybersecurity landscape in 2023. However, the article could benefit from a more detailed discussion on the global collaboration efforts to combat cyber threats.	4	db8ed89a-b373-4f9d-acac-e80ef9d533fd	1ff4247b-dfbe-48d0-83ca-6305dcd97424
ada9f4ea-88b4-4333-b9d5-722f2105dd94	2023-09-29 16:20:30.981514	ÔÇťHarvesting the TidesÔÇŁ offers a succinct yet informative dive into the world of tidal energy in 2023, highlighting notable advancements and future prospects. While the article stands out for its clarity and comprehensive overview of innovative technologies, it slightly lacks depth in discussing the challenges and global collaborations in the tidal energy sector. Nonetheless, it serves as a valuable read for those interested in renewable energy, providing insights into the potential of tidal power in addressing environmental concerns.	4	ba63be24-7e14-499c-a51a-bf19d8f28746	446fdfd5-594f-428f-8ca6-30213ee27071
aab5c6ee-e2b5-48da-99a7-01434e29f0f0	2023-09-29 16:25:18.528881	 KowalskiÔÇÖs article offers a promising, albeit surface-level, overview of the evolving cybersecurity landscape. While insightful, it could benefit from a more detailed exploration of real-world applications and international collaborations to combat emerging threats.	2.5	ba63be24-7e14-499c-a51a-bf19d8f28746	1ff4247b-dfbe-48d0-83ca-6305dcd97424
310655fd-0aeb-4698-bfeb-3f7bbfbfa30f	2023-09-29 16:26:01.412185	This piece serves as a stimulating introduction to VR in education, with Kowalski highlighting its transformative potential. However, it falls short of providing a fully comprehensive view, lacking in-depth exploration of practical implementations and varied educational settings.	2	ba63be24-7e14-499c-a51a-bf19d8f28746	b66de379-5f00-4fd1-abae-7d05d2d2dbcf
\.


--
-- Data for Name: review_downvotes_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review_downvotes_user ("reviewId", "userId") FROM stdin;
39f38679-00d4-4cf7-a6b3-77eb0a85f30e	ba63be24-7e14-499c-a51a-bf19d8f28746
\.


--
-- Data for Name: review_upvotes_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review_upvotes_user ("reviewId", "userId") FROM stdin;
9908f953-52f0-4452-a0ca-d80aba10e2d0	ba63be24-7e14-499c-a51a-bf19d8f28746
39f38679-00d4-4cf7-a6b3-77eb0a85f30e	db8ed89a-b373-4f9d-acac-e80ef9d533fd
c809f5da-3d0c-47c3-9fd7-7089b2368319	db8ed89a-b373-4f9d-acac-e80ef9d533fd
ada9f4ea-88b4-4333-b9d5-722f2105dd94	ba63be24-7e14-499c-a51a-bf19d8f28746
aab5c6ee-e2b5-48da-99a7-01434e29f0f0	ba63be24-7e14-499c-a51a-bf19d8f28746
310655fd-0aeb-4698-bfeb-3f7bbfbfa30f	ba63be24-7e14-499c-a51a-bf19d8f28746
c809f5da-3d0c-47c3-9fd7-7089b2368319	ba63be24-7e14-499c-a51a-bf19d8f28746
\.


--
-- Data for Name: socials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.socials (id, facebook, twitter, youtube, instagram, linkedin, "userId") FROM stdin;
009c4a06-5beb-47a8-8313-10d3b3b7e3ea	facebook.com	twitter.com	youtube.com	\N	\N	db8ed89a-b373-4f9d-acac-e80ef9d533fd
52f21465-9b52-44bb-b2e9-b83f7a20a8d2	\N	\N	youtube.com	instagram.com	linkedin.com	6af49e69-d7f8-49eb-8b72-7c282ddfee23
d06a2856-b444-41ca-a5fd-b7f43cd78050	\N	twitter.com	\N	instagram.com	\N	ba63be24-7e14-499c-a51a-bf19d8f28746
\.


--
-- Data for Name: unverifiedUser; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."unverifiedUser" (id, created, name, surname, password, email, "verificationCode") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, created, name, surname, password, email, description, "profilePicture", "socialsId") FROM stdin;
6af49e69-d7f8-49eb-8b72-7c282ddfee23	2023-09-29 16:04:33.762	Artur	Kowalski	$2a$10$gb.HRrk7jHj.X4jJCvIjpOl.d04dsS2Odjcpu/yPLBQEhI9TQMjYe	a.k@op.pl	Hello, IÔÇÖm Artur Kowalski, a passionate explorer of the digital realm where technology and humanity intertwine. I delve into the complexities and possibilities of our modern, connected world, seeking to uncover and understand the innovations that shape our future. My focus spans across the evolving landscapes of Cybersecurity, the ethical dimensions of Artificial Intelligence, and the transformative role of Virtual Reality in education.\n\nIÔÇÖm committed to shedding light on the advancements and challenges that characterize our digital age, offering insights and sparking thoughtful reflections on the implications of technological progress. Through my writings, I aim to demystify the intricate web of digital innovations, providing a balanced perspective and encouraging meaningful dialogue.\n\nJoin me on this journey of exploration and discovery as we navigate the intricate tapestry of technology and ethics, uncovering the potentials and pitfalls that lie ahead in our interconnected world. LetÔÇÖs foster a deeper understanding and cultivate a shared vision for a harmonious and responsible digital future.	392f5799-7931-43c3-8e65-5f1ebe5f1a74.jpg	52f21465-9b52-44bb-b2e9-b83f7a20a8d2
ba63be24-7e14-499c-a51a-bf19d8f28746	2023-09-29 15:47:07.527	Adam	Bista	$2a$10$Mvoh1dgcmMi3f2pz4DM1G.1JUfkWO3M.9DSNO.ASUguKqBpudPc2m	a.b@op.pl	Hello there, cosmic wanderer! IÔÇÖm an avid seeker of the unknown, exploring the intricate tapestry of our universe and unraveling the mysteries it holds. My journey through the cosmos has led me to delve into topics as vast as the universe itself ÔÇô from the enigmatic dark matter that binds the stars to the harmonious soundscapes that echo through urban canyons, and the intertwining of the digital realm with our tangible world.\n\nI find joy in shedding light on the unseen and unheard, whether itÔÇÖs unveiling the whispers of the cosmos or exploring the silent symphony of our cities. My articles, such as ÔÇťWhispers of the Cosmos: Unveiling the Mysteries of Dark MatterÔÇŁ and ÔÇťEchoing Silences: The Impact of Soundscapes on Urban Well-beingÔÇŁ, are a reflection of this passion ÔÇô a journey through the unseen, the unheard, and the unexplored.\n\nJoin me as I traverse through gardens suspended in the urban jungle, venture into the digital frontiers of cybersecurity, and dance with the shadows of the universe. LetÔÇÖs explore, learn, and wonder at the marvels our world has to offer. Whether youÔÇÖre a fellow explorer of the unknown or a curious mind seeking new horizons, I welcome you to share in my fascination with the mysteries of our existence. Let the exploration begin!	\N	d06a2856-b444-41ca-a5fd-b7f43cd78050
db8ed89a-b373-4f9d-acac-e80ef9d533fd	2023-09-29 15:48:55.071	Anna	Green	$2a$10$ZvQo2t.sM.Xq/6I9N9BNhObB2pK8BpZD/1fbEoqseIy029cIe0tH6	a.g@op.pl	Meet Anna Green, your expert on sustainable development and innovations in renewable energy. Passionate about green energy and cutting-edge technology, I have extensive experience in researching and implementing solutions related to solar power. With a love for discovering novelties in the field of renewable energy sources, I am involved in various projects aimed at reducing CO2 emissions and promoting sustainable living.\n\nI regularly share my knowledge and insights on the latest trends and achievements in green energy. My articles and studies cover topics from innovative photovoltaic cells to advanced energy storage technologies.\n\nBelieving strongly in the power of education and awareness to shape a sustainable future, I conduct workshops and training sessions, inspiring others to take action for the environment. My enthusiasm and commitment make me a valued member of the renewable energy community.\n\nFollow my profile to stay updated on the latest advancements in green energy and draw inspiration for actions to benefit our planet.	4af4e048-ddfd-4a27-9c54-2623ed7ff0bd.jpg	009c4a06-5beb-47a8-8313-10d3b3b7e3ea
\.


--
-- Name: review_downvotes_user PK_21bb80cad5372e9c77e1a9828e4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_downvotes_user
    ADD CONSTRAINT "PK_21bb80cad5372e9c77e1a9828e4" PRIMARY KEY ("reviewId", "userId");


--
-- Name: contact PK_2cbbe00f59ab6b3bb5b8d19f989; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY (id);


--
-- Name: review PK_2e4299a343a81574217255c00ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY (id);


--
-- Name: article PK_40808690eb7b915046558c0f81b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY (id);


--
-- Name: socials PK_5e3ee018e1b66c619ae3d3b3309; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socials
    ADD CONSTRAINT "PK_5e3ee018e1b66c619ae3d3b3309" PRIMARY KEY (id);


--
-- Name: content PK_6a2083913f3647b44f205204e36; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY (id);


--
-- Name: review_upvotes_user PK_74e04996528e6c739f847bbb384; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_upvotes_user
    ADD CONSTRAINT "PK_74e04996528e6c739f847bbb384" PRIMARY KEY ("reviewId", "userId");


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: article_categories_category PK_a8116c8896d1d576d6ea7ad0d3c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_categories_category
    ADD CONSTRAINT "PK_a8116c8896d1d576d6ea7ad0d3c" PRIMARY KEY ("articleId", "categoryId");


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: unverifiedUser PK_fb352590cc89b2ca77528e9d429; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."unverifiedUser"
    ADD CONSTRAINT "PK_fb352590cc89b2ca77528e9d429" PRIMARY KEY (id);


--
-- Name: socials REL_4b4234e208c922a226344e3a7d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socials
    ADD CONSTRAINT "REL_4b4234e208c922a226344e3a7d" UNIQUE ("userId");


--
-- Name: user REL_b3b55060f83562bfd204155d45; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_b3b55060f83562bfd204155d45" UNIQUE ("socialsId");


--
-- Name: unverifiedUser UQ_631016c55e79391dcbc2a8c4448; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."unverifiedUser"
    ADD CONSTRAINT "UQ_631016c55e79391dcbc2a8c4448" UNIQUE (email);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: IDX_3092a434162ced9ced78a51849; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_3092a434162ced9ced78a51849" ON public.review_downvotes_user USING btree ("userId");


--
-- Name: IDX_4ba35bcb36b2715f61faa696c7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_4ba35bcb36b2715f61faa696c7" ON public.article_categories_category USING btree ("articleId");


--
-- Name: IDX_5d9199768aa2bd9f91d175dc6d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5d9199768aa2bd9f91d175dc6d" ON public.article_categories_category USING btree ("categoryId");


--
-- Name: IDX_86181de8a207910504ea7b8f58; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_86181de8a207910504ea7b8f58" ON public.review_downvotes_user USING btree ("reviewId");


--
-- Name: IDX_a09afced52764d532cc0520add; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_a09afced52764d532cc0520add" ON public.review_upvotes_user USING btree ("reviewId");


--
-- Name: IDX_b356c24d0d3c9fa4517e7238e2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_b356c24d0d3c9fa4517e7238e2" ON public.review_upvotes_user USING btree ("userId");


--
-- Name: review FK_1337f93918c70837d3cea105d39; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: review_downvotes_user FK_3092a434162ced9ced78a518490; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_downvotes_user
    ADD CONSTRAINT "FK_3092a434162ced9ced78a518490" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: review FK_392d1bd467a05f6634a4e31f33c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_392d1bd467a05f6634a4e31f33c" FOREIGN KEY ("articleId") REFERENCES public.article(id);


--
-- Name: socials FK_4b4234e208c922a226344e3a7d0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.socials
    ADD CONSTRAINT "FK_4b4234e208c922a226344e3a7d0" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: article_categories_category FK_4ba35bcb36b2715f61faa696c7e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_categories_category
    ADD CONSTRAINT "FK_4ba35bcb36b2715f61faa696c7e" FOREIGN KEY ("articleId") REFERENCES public.article(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_categories_category FK_5d9199768aa2bd9f91d175dc6d1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_categories_category
    ADD CONSTRAINT "FK_5d9199768aa2bd9f91d175dc6d1" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- Name: article FK_636f17dadfea1ffb4a412296a28; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "FK_636f17dadfea1ffb4a412296a28" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: review_downvotes_user FK_86181de8a207910504ea7b8f588; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_downvotes_user
    ADD CONSTRAINT "FK_86181de8a207910504ea7b8f588" FOREIGN KEY ("reviewId") REFERENCES public.review(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: review_upvotes_user FK_a09afced52764d532cc0520add6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_upvotes_user
    ADD CONSTRAINT "FK_a09afced52764d532cc0520add6" FOREIGN KEY ("reviewId") REFERENCES public.review(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: content FK_ae4cf5971a967551d3953fa4045; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content
    ADD CONSTRAINT "FK_ae4cf5971a967551d3953fa4045" FOREIGN KEY ("articleId") REFERENCES public.article(id);


--
-- Name: review_upvotes_user FK_b356c24d0d3c9fa4517e7238e27; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_upvotes_user
    ADD CONSTRAINT "FK_b356c24d0d3c9fa4517e7238e27" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user FK_b3b55060f83562bfd204155d451; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_b3b55060f83562bfd204155d451" FOREIGN KEY ("socialsId") REFERENCES public.socials(id);


--
-- PostgreSQL database dump complete
--

