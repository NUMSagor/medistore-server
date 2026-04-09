--
-- PostgreSQL database dump
--

\restrict 5ka3gYiKPTd7fjmkS01g85clAzzb8uw77wqdniLg8cslaORauyNNNmbCjOl7kt6

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, slug, "isActive", "parentId", "createdAt", "updatedAt") FROM stdin;
24f680fa-98b0-4128-8602-e02cbd0a7381	Generel	generel	t	\N	2026-01-28 05:14:55.762	2026-01-28 05:14:55.762
7f13c502-0364-4545-a75f-734c95593240	Back-Pain	back-pain	t	\N	2026-01-28 05:15:10.596	2026-01-28 05:15:10.596
f7931c3e-f9a3-4749-9df0-0d30cf8489eb	Pain Relief	pain-relief	t	\N	2026-01-28 05:18:27.517	2026-01-28 05:18:27.517
58325ed0-33d6-4035-ad20-1926dd115f52	Cold & Flu	cold-&-flu	t	\N	2026-01-28 05:18:37.465	2026-01-28 05:18:37.465
dccd22f0-b12b-4b18-8cea-3db4e1d85592	Digestive Health	digestive-health	t	\N	2026-01-28 05:18:46.296	2026-01-28 05:18:46.296
979c1211-780b-4a60-8bbc-f6f38c549b0d	Vitamins & Supplements	vitamins-&-supplements	t	\N	2026-01-28 05:18:55.199	2026-01-28 05:18:55.199
b99dd5a2-4956-4edf-92b0-069df6e0737b	Diabetes Care	diabetes-care	t	\N	2026-01-28 05:19:07.01	2026-01-28 05:19:07.01
c163a55c-f61a-4bd8-9c57-27ab5d7e022f	Skin Care	skin-care	t	\N	2026-01-28 05:19:26.895	2026-03-28 16:52:01.555
773d9613-80d8-404e-8cd5-d5548d2fb91b	Hair Care	hair-care	t	\N	2026-03-28 16:53:04.147	2026-03-28 16:53:04.147
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, name, "createdAt", password, role, status, "updatedAt", phone) FROM stdin;
bbf05e19-011e-4b91-a71b-67f5ba05dfad	alice@gmail.com	Alice Blue	2026-01-27 11:51:08.815	$2b$10$V0mHflpRv324VgqsLzVm5ufNwjHdfzZavsh0536j0f.OfWDi3G/r2	CUSTOMER	ACTIVE	2026-01-27 11:51:08.815	\N
b59555d5-7932-4fe4-8c45-348de2ccb0a3	rasel@gmail.com	Rasel Mahmud	2026-01-27 11:53:32.479	$2b$10$hanlFBKSe6uaML82zJ5idu5bY9vMQWYaDK73RFvT7heQKBoTvqvx2	CUSTOMER	ACTIVE	2026-01-27 11:53:32.479	\N
6d4a4895-7b7e-4576-8c03-1ac3fcccb39c	sellertwo@gmail.com	 Seller Two	2026-01-27 11:57:33.275	$2b$10$u6X3FPda7AANrWi62v2FiukE5wtPMLlNnsUEip6.y66HeBERynyYm	SELLER	ACTIVE	2026-01-27 11:57:33.275	\N
837e7154-d68b-4269-88d2-1e774b54bbc4	smadmin@gmail.com	Sagor Mahmud	2026-01-27 16:48:48.68	$2b$10$1WyAFdCIsFLaNQGtN/WJouFvp4XBpKsj0USnX.WFo90qsC4nwcVmq	ADMIN	ACTIVE	2026-01-27 16:48:48.68	\N
1147a538-c4bd-40e5-9a3a-954fc445a108	sellerone@gmail.com	 Seller One	2026-01-27 11:56:50.085	$2b$10$2rNzaDjTByIC6kZhmU2RAuudEfJacGcfoKS5qSkCnOi.3ap58QlaS	SELLER	ACTIVE	2026-01-27 17:29:56.607	\N
3219c50a-529b-4247-b263-f0cdbdfb8973	halim@gmail.com	Abdul Halim	2026-01-27 17:31:41.038	$2b$10$vqRUI5hwKYsljdTl3RZmO.jJVwPHlS9bP4vvckH5cvQ0xpCK0lvOa	SELLER	ACTIVE	2026-01-27 17:31:41.038	\N
fb5bf1ea-c1d2-4e89-bf1c-7dad4f542fc3	kamrul@gmail.com	Kamrul Hasan	2026-01-31 11:12:55.435	$2b$10$VFyJzLwPPiKXBjfjVD.96uLP7SNmTQLEDtArpCujbpmxqm5jJ5T6q	CUSTOMER	ACTIVE	2026-01-31 11:12:55.435	\N
d0e0dcea-5b39-4cca-89fe-bcf8f7950b3a	adam@gmail.com	Adam Bede	2026-03-29 06:23:41.021	$2b$10$ZFf7TOa22k3WO.NlI8Euwe/psT/HaKQz2/GVMRYqJXzicsMTpMF/e	CUSTOMER	ACTIVE	2026-03-29 07:53:24.853	\N
e4e697a5-d05e-4275-8f52-e3e79502dca0	tarin@gmail.com	Tarin Ahmed	2026-03-29 08:13:31.846	$2b$10$KBDberGoyGFWSzLU93iWK.Ine9nhjv70jvblg44Mv8udpKidxNkBC	CUSTOMER	ACTIVE	2026-03-29 08:13:31.846	\N
\.


--
-- Data for Name: Medicine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Medicine" (id, name, "genericName", manufacturer, description, price, "discountPercent", stock, "isActive", "sellerId", "categoryId", "createdAt", "updatedAt", "imageUrl") FROM stdin;
9d985e0c-fc92-4f65-8e23-96aa36abf5e6	Vitamin C	Ascorbic Acid	NutriHealth	Boosts immunity	30	0	138	t	3219c50a-529b-4247-b263-f0cdbdfb8973	979c1211-780b-4a60-8bbc-f6f38c549b0d	2026-01-28 08:30:29.202	2026-03-29 08:50:39.35	\N
791ae5ef-0217-47ee-9325-025b74955e6c	Paracetamol	Acetaminophen	Beximco Pharma	Pain reliever for fever and headache	70	10	80	t	3219c50a-529b-4247-b263-f0cdbdfb8973	f7931c3e-f9a3-4749-9df0-0d30cf8489eb	2026-01-28 08:26:29.888	2026-01-28 15:21:46.806	\N
21787463-8163-42ce-92ae-38d490731b4e	Cetirizine	Cetirizine Hydrochloride	AllergyFree	Relieves allergy symptoms	40	0	109	t	3219c50a-529b-4247-b263-f0cdbdfb8973	24f680fa-98b0-4128-8602-e02cbd0a7381	2026-01-28 08:31:50.046	2026-03-29 08:15:09.682	\N
c486aa0f-38bf-4a06-a9c8-440e1749683a	Amoxicillin	Amoxicillin Trihydrate	PharmaLife	Used for bacterial infections	90	0	46	t	3219c50a-529b-4247-b263-f0cdbdfb8973	24f680fa-98b0-4128-8602-e02cbd0a7381	2026-01-28 08:31:15.206	2026-03-29 08:29:56.178	\N
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "customerId", status, "shippingAddress", "createdAt", "updatedAt") FROM stdin;
84a00ef4-f72c-4b67-8f85-f2faee14c1c5	b59555d5-7932-4fe4-8c45-348de2ccb0a3	PLACED	House 12, Road 4, Dhanmondi, Dhaka	2026-01-28 09:31:49.084	2026-01-28 09:31:49.084
713627b7-28e6-4760-aab6-97fa853b4a70	b59555d5-7932-4fe4-8c45-348de2ccb0a3	PLACED	House 05, Road 05, Gulshan, Dhaka	2026-01-28 09:48:26.194	2026-01-28 09:48:26.194
03ef83ba-e81b-49dd-869d-9716ba37a318	b59555d5-7932-4fe4-8c45-348de2ccb0a3	SHIPPED	House 05, Road 05, Uttara, Dhaka	2026-01-28 15:21:46.792	2026-01-28 16:42:03.059
847aff29-54c5-4602-9cd7-4b0abb0517c7	b59555d5-7932-4fe4-8c45-348de2ccb0a3	SHIPPED	House 05, Road 05, Uttara, Dhaka	2026-01-28 15:16:54.82	2026-01-28 16:42:52.293
85b60d57-0b17-4102-8a11-73e78b49e685	b59555d5-7932-4fe4-8c45-348de2ccb0a3	SHIPPED	House 12, Road 4, Dhanmondi, Dhaka	2026-01-28 09:30:45.183	2026-01-28 16:43:28.773
faaeb1af-6c14-4fc9-81f9-8488871d0827	b59555d5-7932-4fe4-8c45-348de2ccb0a3	SHIPPED	House 2, Road 4, Mohammadpur, Dhaka	2026-01-28 09:43:01.982	2026-01-28 16:43:46.634
e913a109-2c54-4e60-a06e-ebbc29320a54	b59555d5-7932-4fe4-8c45-348de2ccb0a3	PROCESSING	Rasel Mahmud, dhaka mohammad pur, dhaka, 1205, Bangladesh, Phone: +8801719310527	2026-02-11 07:28:30.668	2026-02-11 07:28:30.668
4b13437e-3894-4f0d-9370-0ffb18b0e402	b59555d5-7932-4fe4-8c45-348de2ccb0a3	PROCESSING	Rasel Mahmud, palashbari, rangpur, 5730, Bangladesh, Phone: 01820975502	2026-02-11 08:13:36.834	2026-02-11 08:13:36.834
f8730f4a-b206-4258-8664-d50ce162bcfe	b59555d5-7932-4fe4-8c45-348de2ccb0a3	PROCESSING	Rasel Mahmud, \n      Palashbari, \n      Rangpur, \n      1205, \n      Bangladesh, \n      Phone: 01719310525	2026-03-27 11:50:02.995	2026-03-27 11:50:02.995
1c3e5da9-5d55-42fd-81fd-9b1a54f8b237	b59555d5-7932-4fe4-8c45-348de2ccb0a3	PROCESSING	Rasel Mahmud, \n      Palashbari, \n      Rangpur, \n      1205, \n      Bangladesh, \n      Phone: 01719310525	2026-03-27 11:50:26.921	2026-03-27 11:50:26.921
e4d96858-bc15-4d45-b022-f7f726403f7a	b59555d5-7932-4fe4-8c45-348de2ccb0a3	PROCESSING	Rasel Mahmud, \n      Palashbari, \n      Rangpur, \n      1205, \n      Bangladesh, \n      Phone: 01719310525	2026-03-27 13:25:54.05	2026-03-27 13:25:54.05
06860714-7926-45d8-a930-13286ca49cce	bbf05e19-011e-4b91-a71b-67f5ba05dfad	PROCESSING	Alice Blue, \n      Uposhohor, \n      Bogura, \n      5700, \n      Bangladesh, \n      Phone: 01820975502	2026-03-29 05:22:54.904	2026-03-29 05:22:54.904
5f5d724a-2678-4633-a69e-7b271d5bdb09	e4e697a5-d05e-4275-8f52-e3e79502dca0	PROCESSING	Tarin Ahmed, \n      Palashbari, \n      Rangpur, \n      1205, \n      Bangladesh, \n      Phone: 01719310525	2026-03-29 08:15:09.699	2026-03-29 08:15:09.699
72fb221e-5bed-4833-96ff-374e376ea702	e4e697a5-d05e-4275-8f52-e3e79502dca0	PROCESSING	Tarin Ahmed, \n      Uposhohor, \n      Bogura, \n      5700, \n      Bangladesh, \n      Phone: 01820975502	2026-03-29 08:29:17.227	2026-03-29 08:29:17.227
62544db0-219c-4f13-8ee7-b6773a59333a	e4e697a5-d05e-4275-8f52-e3e79502dca0	PROCESSING	Rasel Mahmud, \n      Palashbari, \n      Rangpur, \n      1205, \n      Bangladesh, \n      Phone: 01719310525	2026-03-29 08:29:56.182	2026-03-29 08:29:56.182
34ef281b-5e0e-45a4-b57e-b6c4289a969b	b59555d5-7932-4fe4-8c45-348de2ccb0a3	PROCESSING	Rasel Mahmud, \n      Palashbari, \n      Rangpur, \n      1205, \n      Bangladesh, \n      Phone: 01719310525	2026-03-29 08:50:39.365	2026-03-29 08:50:39.365
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "medicineId", quantity, price, "createdAt") FROM stdin;
3e85a4f3-0649-4658-ae80-0ac49243321d	85b60d57-0b17-4102-8a11-73e78b49e685	21787463-8163-42ce-92ae-38d490731b4e	2	40	2026-01-28 09:30:45.183
f04a4c06-0201-469c-9763-c97fc4d2362e	85b60d57-0b17-4102-8a11-73e78b49e685	c486aa0f-38bf-4a06-a9c8-440e1749683a	1	90	2026-01-28 09:30:45.183
b2ed27e3-40a4-4b6d-a094-1760e4ce7ec9	84a00ef4-f72c-4b67-8f85-f2faee14c1c5	21787463-8163-42ce-92ae-38d490731b4e	2	40	2026-01-28 09:31:49.084
724ab607-03ac-440b-bf38-2fb2eea1d07c	84a00ef4-f72c-4b67-8f85-f2faee14c1c5	c486aa0f-38bf-4a06-a9c8-440e1749683a	1	90	2026-01-28 09:31:49.084
bbff98cd-c33e-4d6c-98f2-390ddbd19339	faaeb1af-6c14-4fc9-81f9-8488871d0827	21787463-8163-42ce-92ae-38d490731b4e	5	40	2026-01-28 09:43:01.982
f5d1dfae-82d5-4186-9206-dee8f2be61cb	faaeb1af-6c14-4fc9-81f9-8488871d0827	c486aa0f-38bf-4a06-a9c8-440e1749683a	3	90	2026-01-28 09:43:01.982
fdc7b48d-474d-4510-b241-b24b7488e449	713627b7-28e6-4760-aab6-97fa853b4a70	9d985e0c-fc92-4f65-8e23-96aa36abf5e6	3	30	2026-01-28 09:48:26.194
4008989b-cbd5-4f67-b76b-8a6d5bc4772f	713627b7-28e6-4760-aab6-97fa853b4a70	791ae5ef-0217-47ee-9325-025b74955e6c	5	60	2026-01-28 09:48:26.194
89515be5-902e-47c9-8418-390edd189f0f	847aff29-54c5-4602-9cd7-4b0abb0517c7	9d985e0c-fc92-4f65-8e23-96aa36abf5e6	3	30	2026-01-28 15:16:54.82
a4d854ca-bbab-460e-bbc9-cd091cfbca0a	847aff29-54c5-4602-9cd7-4b0abb0517c7	791ae5ef-0217-47ee-9325-025b74955e6c	5	70	2026-01-28 15:16:54.82
3720cce5-6be7-45af-8dde-90d49402bf00	03ef83ba-e81b-49dd-869d-9716ba37a318	9d985e0c-fc92-4f65-8e23-96aa36abf5e6	3	30	2026-01-28 15:21:46.792
e4e6e8fe-ac8f-43df-8f8b-c9066fb3c08f	03ef83ba-e81b-49dd-869d-9716ba37a318	791ae5ef-0217-47ee-9325-025b74955e6c	5	70	2026-01-28 15:21:46.792
7ba3687b-5831-4816-8404-caa34701d0a0	e913a109-2c54-4e60-a06e-ebbc29320a54	9d985e0c-fc92-4f65-8e23-96aa36abf5e6	1	30	2026-02-11 07:28:30.668
7b8b5a42-f502-4225-b1d2-68ff1b8bf294	4b13437e-3894-4f0d-9370-0ffb18b0e402	9d985e0c-fc92-4f65-8e23-96aa36abf5e6	1	30	2026-02-11 08:13:36.834
4c43fa77-56ea-4070-be62-84004710ab02	f8730f4a-b206-4258-8664-d50ce162bcfe	c486aa0f-38bf-4a06-a9c8-440e1749683a	2	90	2026-03-27 11:50:02.995
2c1c69d7-0c85-4b04-bddb-c835bbc9ed6b	1c3e5da9-5d55-42fd-81fd-9b1a54f8b237	c486aa0f-38bf-4a06-a9c8-440e1749683a	1	90	2026-03-27 11:50:26.921
250714be-1f54-4ae1-b2da-026799a6cfeb	e4d96858-bc15-4d45-b022-f7f726403f7a	c486aa0f-38bf-4a06-a9c8-440e1749683a	1	90	2026-03-27 13:25:54.05
ac709ae8-58f4-4697-ba2b-acd7fa3c48f3	06860714-7926-45d8-a930-13286ca49cce	c486aa0f-38bf-4a06-a9c8-440e1749683a	1	90	2026-03-29 05:22:54.904
116948c2-eb16-4461-8c98-fd05c3982985	5f5d724a-2678-4633-a69e-7b271d5bdb09	21787463-8163-42ce-92ae-38d490731b4e	2	40	2026-03-29 08:15:09.699
0998f11f-78f9-4ed7-987b-58252a42d265	72fb221e-5bed-4833-96ff-374e376ea702	c486aa0f-38bf-4a06-a9c8-440e1749683a	2	90	2026-03-29 08:29:17.227
14014afe-bbd4-4f8b-aae6-d45767d19e43	62544db0-219c-4f13-8ee7-b6773a59333a	c486aa0f-38bf-4a06-a9c8-440e1749683a	2	90	2026-03-29 08:29:56.182
f4fcafb1-ff08-4d1c-8b9f-fbad71dae642	34ef281b-5e0e-45a4-b57e-b6c4289a969b	9d985e0c-fc92-4f65-8e23-96aa36abf5e6	1	30	2026-03-29 08:50:39.365
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, rating, comment, "userId", "medicineId", "createdAt", status) FROM stdin;
9dad1219-0a48-43cc-99e5-3871db3fd147	4	This helps ma to get relife!	b59555d5-7932-4fe4-8c45-348de2ccb0a3	c486aa0f-38bf-4a06-a9c8-440e1749683a	2026-01-29 06:27:55.584	PENDING
36221af8-3a7a-4332-93c3-dbcc525b7442	4	This medicine worked really well!	b59555d5-7932-4fe4-8c45-348de2ccb0a3	21787463-8163-42ce-92ae-38d490731b4e	2026-01-29 06:26:22.54	APPROVED
e888daf4-6abc-4fa2-804f-a91c3830f9bc	5	Really this vitamin is greatfor my health!	b59555d5-7932-4fe4-8c45-348de2ccb0a3	9d985e0c-fc92-4f65-8e23-96aa36abf5e6	2026-01-29 06:28:56.146	APPROVED
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d3f6b077-3807-4c7f-9d52-fd23a48f4ece	ad6f19d4e4562c0e2b9f616ba2f2470a28d3bfc2bdca20b611be938598de7e63	2026-01-27 12:15:09.07774+06	20260126162026_first	\N	\N	2026-01-27 12:15:09.017022+06	1
fbace0ca-60e7-487a-ae12-e46a0e184fb6	bde5e3b0fe4dd109f6b25fd3ad13662287a821039e61017732e3f797269d685a	2026-01-27 12:15:31.087996+06	20260127061530_first_migration	\N	\N	2026-01-27 12:15:30.69555+06	1
b26501c8-4f68-46f0-835f-ea19921f5248	ed4ee6f504f2dff8030aacf7174bb923036f97881d6062544e6a262bd34f7d5f	2026-01-28 11:13:45.530825+06	20260128051345	\N	\N	2026-01-28 11:13:45.489912+06	1
2954b841-48ab-45fe-8d5d-c8d80d7a3ea0	a8fa2ade9e16bec777e4aef17c20b41d87d7f3128a5e3f4d26e253540e5c5ea6	2026-01-28 11:38:05.242964+06	20260128053805_no_duplicate	\N	\N	2026-01-28 11:38:05.164654+06	1
49accfb2-a442-4fc4-bfff-2fb9e5c6eefb	f2fb9127d7d85797b66c077a7eda3c525dbf552a9381e4de1f231527aaed0390	2026-01-28 15:41:23.590076+06	20260128094123_status_update	\N	\N	2026-01-28 15:41:23.531628+06	1
109b24c6-5b04-43c8-89af-5ee70e9d3e70	88aedfb0b0fcec9d2d016dccc7a5c921b09dbbc2252a6ae61b0f7b9c2f0a13f9	2026-01-28 23:19:24.400875+06	20260128171924_review_status	\N	\N	2026-01-28 23:19:24.22641+06	1
c0d44209-32e6-4551-b306-ef9844eb5793	81b2898bf65d386edad336b258a47f4d4fe0fe7443a25a72bc1c712e834c2871	2026-01-31 19:35:33.935774+06	20260131133533_medecine_schema_image_added	\N	\N	2026-01-31 19:35:33.892352+06	1
76f42b5f-7562-4a41-9ef2-9f71211bbfd9	52ca907db1f131b0cb48d3debe148667ef034f663017d20e8cc3ff82dfa0c277	2026-03-29 11:17:16.855652+06	20260329051716_add_phone_to_user	\N	\N	2026-03-29 11:17:16.790957+06	1
\.


--
-- PostgreSQL database dump complete
--

\unrestrict 5ka3gYiKPTd7fjmkS01g85clAzzb8uw77wqdniLg8cslaORauyNNNmbCjOl7kt6

