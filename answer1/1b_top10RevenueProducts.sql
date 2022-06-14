with top1_seller_by_catetory as (
    select * from (
        select 
            IFNULL(p.category,'Uncategorized') as category, 
            p.product_id, 
            p.product_name, 
            sum(s.total_revenue) as product_total_revenue,
            ROW_NUMBER() OVER( PARTITION BY p.category ORDER BY sum(s.quantity) DESC) r
    from product p 
    inner join salesorder s on p.product_id = s.product_id
    group by product_id 
) as sell_by_catetory
    where r = 1
)

select 
p.category, 
count(s.product_id) as no_of_orders, 
sum(s.quantity) as sold_counts, 
sum(s.total_revenue) as category_total_revenue,
t.product_id as bestseller_product_id,
t.product_name as bestseller_product_name,
t.product_total_revenue as bestseller_total_revenue
from product p
inner join salesorder s on p.product_id = s.product_id
left join top1_seller_by_catetory t on t.category = p.category
group by p.category
order by sum(s.total_revenue) desc
limit 10