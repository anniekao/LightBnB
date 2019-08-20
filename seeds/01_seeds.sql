INSERT INTO users (id, name, email, password) VALUES (1, 'Jack Johnson', 'jj @ gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
                                                 (2, 'Max Mustermann', 'mm@protonmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
                                                 (3, 'Bob Loblaw', 'bl@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, street, post_code, province) VALUES (1, 1, 'A property 1', 'description', 'http://www.aphoto.de/8329jjj.jpg', 'http://     www.aphoto.de/8329jjj.jpg', 60, 1, 1, 1, 'USA', 'Chicago', 'Street', '90210', 'IL'),
                                                   (2, 2, 'A property 2', 'description', 'http://www.aphoto.de/8329jjj.jpg', 'http://www.aphoto.de/8329jjj.jpg', 100, 1, 1, 2, 'Canada', 'Toronto', 'Street', 'L1M1G4', 'ON'),
                                                   (3, 3, 'A property 3', 'description', 'http://www.aphoto.de/8329jjj.jpg', 'http://www.aphoto.de/8329jjj.jpg', 200, 2, 2, 2, 'Canada', 'Vancouver', 'Street', '90210', 'BC');

INSERT INTO rates (start_date, end_date, cost_per_night, property_id) VALUES ('2019-02-03', '2019-02-06', 60, 3),
                                                                             ('2019-01-11', '2019-01-16', 80, 2),
                                                                             ('2019-06-30', '2019-07-07', 120, 1);

INSERT INTO reservations (id, guest_id, property_id, start_date, end_date) VALUES (1, 1, 1, '2018-09-11', '2018-09-26'),
                                                                              (2, 2, 3, '2019-01-04', '2019-02-01'),
                                                                              (3, 3, 2, '2021-10-01', '2021-10-14');

INSERT INTO guest_reviews (id, guest_id, owner_id, reservation_id, rating, message) VALUES (1, 1, 2, 1, 4, 'Great!'),
                                                                                       (2, 2, 3, 2, 3, 'Just OK.'),
                                                                                       (3, 3, 1, 3, 5, 'Fantastic!');

INSERT INTO property_reviews (id, guest_id, reservation_id, property_id, rating, message) VALUES (1, 1, 1, 1, 3, 'Fine for one night.'),
                                                                                             (2, 2, 2, 2, 5, 'Amazing'),
                                                                                             (3, 3, 3, 3, 4, 'Great');