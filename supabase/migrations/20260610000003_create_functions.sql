-- Migration: 조회수 증가 RPC 함수
create or replace function increment_views(post_id bigint)
returns void
language sql
security definer
as $$
  update posts set views = views + 1 where id = post_id;
$$;
