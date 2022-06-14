select 
s.product_id, 
p.product_name, 
count(s.order_id) as no_of_orders, 
sum(s.quantity) as sold_counts, 
sum(s.total_revenue) as product_total_revenue
from product p
inner join salesorder s on p.product_id = s.product_id
group by s.product_id
order by sum(s.quantity) desc
limit 10;
