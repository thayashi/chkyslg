const cron = require('node-cron');
const notifier = require('node-notifier');
const scraperjs = require('scraperjs');
const _ = require('underscore');
const check_date = [11, 12, 13, 14];


var of_snow_lodge_check = function() {
  var title = 'Old Faithful Snow Lodge';
  var result_date = [];
  var url = 'https://ynpres1.xanterra.com/cgi-bin/lansaweb?procfun+rn+resnet+RES+funcparms+UP(A2560):;OSSUM6;071216;2;2;2;010;?/&__utma=85180305.300112895.1464928284.1465533553.1465540386.18&__utmb=85180305.0.10.1465533566&__utmc=85180305&__utmx=-&__utmz=85180305.1465209058.3.3.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)&__utmv=-&__utmk=94443733';
  var scraper = scraperjs.StaticScraper.create(url)
    .scrape(function($) {
      var $td = $(".calsection td.month > center > b:contains('JULY')");
      var $table = $td.closest('table');
      $table.each(function(){
        var $available_td = $(this).find('td[bgcolor="#D4EDD6"] > a');
        $available_td.each(function(){
          $this = $(this);
          $this.children('span').remove();
          $this.children('br').remove();
          var num = Number($this.text());
          if (_.contains(check_date, num)) {
            result_date.push(num);
          }
        });
        //console.log($available_td.length);
      });
      if (result_date.length > 0) {
        var date = new Date();
        result_date.forEach(function(i, n) {
          notifier.notify({
            title: title,
            message: i + 'th is available : ' + date.toLocaleTimeString()
          });
        });
      }
    });
}

var of_inn_check = function() {
  var title = 'Old Faithful Inn';
  var result_date = [];
  var url = 'https://ynpres1.xanterra.com/cgi-bin/lansaweb?procfun+rn+resnet+RES+funcparms+UP(A2560):;OISUM6;071216;2;2;2;010;?/&__utma=85180305.300112895.1464928284.1465533553.1465540386.18&__utmb=85180305.0.10.1465395931&__utmc=85180305&__utmx=-&__utmz=85180305.1465209058.3.3.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)&__utmv=-&__utmk=26202228';
  var scraper = scraperjs.StaticScraper.create(url)
    .scrape(function($) {
      var $td = $(".calsection td.month > center > b:contains('JULY')");
      var $table = $td.closest('table');
      $table.each(function(){
        var $available_td = $(this).find('td[bgcolor="#D4EDD6"] > a');
        $available_td.each(function(){
          $this = $(this);
          $this.children('span').remove();
          $this.children('br').remove();
          var num = Number($this.text());
          if (_.contains(check_date, num)) {
            result_date.push(num);
          }
        });
        //console.log($available_td.length);
      });
      if (result_date.length > 0) {
        var date = new Date();
        result_date.forEach(function(i, n) {
          notifier.notify({
            title: title,
            message: i + 'th is available : ' + date.toLocaleTimeString()
          });
        });
      }
    });
}

var of_inn_check = function() {
  var title = 'Old Faithful Lodge';
  var result_date = [];
  var url = 'https://ynpres1.xanterra.com/cgi-bin/lansaweb?procfun+rn+resnet+RES+funcparms+UP(A2560):;OLSUM6;071216;2;2;2;010;?/&__utma=85180305.300112895.1464928284.1465533553.1465540386.18&__utmb=85180305.0.10.1465395961&__utmc=85180305&__utmx=-&__utmz=85180305.1465209058.3.3.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided)&__utmv=-&__utmk=134689080';
  var scraper = scraperjs.StaticScraper.create(url)
    .scrape(function($) {
      var $td = $(".calsection td.month > center > b:contains('JULY')");
      var $table = $td.closest('table');
      $table.each(function(){
        var $available_td = $(this).find('td[bgcolor="#D4EDD6"] > a');
        $available_td.each(function(){
          $this = $(this);
          $this.children('span').remove();
          $this.children('br').remove();
          var num = Number($this.text());
          if (_.contains(check_date, num)) {
            result_date.push(num);
          }
        });
        //console.log($available_td.length);
      });
      if (result_date.length > 0) {
         var date = new Date();
        result_date.forEach(function(i, n) {
          notifier.notify({
            title: title,
            message: i + 'th is available : ' + date.toLocaleTimeString()
          });
        });
      }
    });
}

const task = cron.schedule('*/5 * * * *', function() {
  of_snow_lodge_check();
  of_inn_check();
  var date = new Date();
  console.log('running a task every 5 minutes : ' + date.toLocaleString());
});

task.start();

