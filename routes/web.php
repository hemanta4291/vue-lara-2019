<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

//Route::get('/home', 'HomeController@index')->name('home');

Route::get('/home', 'HomeController@index')->name('home');

//Route::get('{path}','HomeController@index')->where( 'path', '([A-z\d-/_.]+)?' ); old not working

Route::get('{path}',"HomeController@index")->where( 'path', '([a-zA-Z0-9\.\,\-_%=+]+)?' ); //convert vue route to laravel route





