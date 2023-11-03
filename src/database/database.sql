create database enjoy;

create table users (
id serial primary key,
name text not null,
email text unique,
password text not null
);

create table cars(
id serial primary key,
brand text,
model text,
yearCar integer,
collor text,
price integer,
user_id integer not null references users(id)
);