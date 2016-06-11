const cron = require('node-cron');
const notifier = require('node-notifier');
const scraperjs = require('scraperjs');
const _ = require('underscore');
const check_date = [11, 12, 13, 14];

function lodge_check() {
  this.title = null;
  this.url = null;
  this.result_date = [];
  this.scrape = function () {
    var self = this;
    if (!self.title || !self.url) {
      throw 'No title or No url';
    }
    var url = self.url + '&_time=' + (new Date).getTime();
    var scraper = scraperjs.StaticScraper.create(url)
    .scrape(function($) {
      var $td = $(".calsection td.month > center > b:contains('JULY')");
      var $table = $td.closest('table');
      $table.each(function(i, elm){
        var $available_td = $(this).find('td[bgcolor="#D4EDD6"] > a');
        $available_td.each(function(){
          $this = $(this);
          $this.children('span').remove();
          $this.children('br').remove();
          var num = Number($this.text());
          if (_.contains(check_date, num)) {
            self.result_date.push({
              'table': i,
              'date': num
            });
          }
        });
        //console.log($available_td.length);
      });
      if (self.result_date.length > 0) {
        var date = new Date();
        self.result_date.forEach(function(i) {
          console.log(i);
          notifier.notify({
            title: self.title,
            message: '[' + i.table + '] ' + i.date + 'th is available : ' + date.toLocaleTimeString()
          });
        });
      }
    });
  }
}


const task = cron.schedule('*/5 * * * *', function() {
  var of_inn = new lodge_check();
  of_inn.title = 'Old Faithful Inn';
  of_inn.url = 'https://ynpres1.xanterra.com/cgi-bin/lansaweb?procfun+rn+resnet+RES+funcparms+UP(A2560):;OISUM6;071216;2;2;2;010;?/';


  var of_l = new lodge_check();
  of_l.title = 'Old Faithful Lodge';
  of_l.url = 'https://ynpres1.xanterra.com/cgi-bin/lansaweb?procfun+rn+resnet+RES+funcparms+UP(A2560):;OLSUM6;071216;2;2;2;010;?/';


  var of_snow = new lodge_check();
  of_snow.title = 'Old Faithful Snow Lodge';
  of_snow.url = 'https://ynpres1.xanterra.com/cgi-bin/lansaweb?procfun+rn+resnet+RES+funcparms+UP(A2560):;OSSUM6;071216;2;2;2;010;?/';

  of_inn.scrape();
  of_l.scrape();
  of_snow.scrape();
  var date = new Date();
  console.log('running a task every 5 minutes : ' + date.toLocaleString());
});

task.start();

  // var of_inn = new lodge_check();
  // of_inn.title = 'Old Faithful Inn';
  // of_inn.url = 'https://ynpres1.xanterra.com/cgi-bin/lansaweb?procfun+rn+resnet+RES+funcparms+UP(A2560):;OISUM6;071216;2;2;2;010;?/';
  // of_inn.scrape();

