SELECT reservations.*, properties.*, AVG(property_reviews.rating) 
FROM reservations 
JOIN properties ON (reservations.property_id = properties.id)
JOIN property_reviews ON (property_reviews.property_id = properties.id)
WHERE reservations.guest_id = 1 AND reservations.end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date DESC
LIMIT 10;