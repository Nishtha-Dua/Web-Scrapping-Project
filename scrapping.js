var http = require('http'),
fs = require('fs'),
express = require('express'),
session = require('express-session'),
app = express(),
router = express.Router(),
path = require('path'),
mongoose = require('mongoose'),
hbs = require('express-handlebars'),
asser = require('assert'),
server = require('http').createServer(app),
bodyParser = require('body-parser'),
Schema = mongoose.Schema,
request = require('request'),
cheerio = require('cheerio');

server.listen('8080');

var urls = [];
var titles = [];
var imglinks = [];
var mainurls = [];
var mainheads = [];
var enturls = [];
var entimglinks = [];
var entheads = [];
var sporturls = [];
var sportheads = [];
var sportimglinks = [];
var worldurls = [];
var worldheads = [];
var worldimglinks = [];
var maingallerylinks = [];
var maingalleryurls = [];
var maingallerytitle = [];
var featuregallerylinks = [];
var featuregalleryurls = [];
var featuregallerytitle = [];
var headgallerylinks = [];
var headgalleryurls = [];
var headgallerytitle = [];
var headweatherurls = [];
var headweatherlinks = [];
var headweathertitle = [];
var featureweatherurls =[];
var featureweatherlinks = [];
var featureweathertitle = [];
var mainweatherurls = [];
var mainweathertitle = [];
var mainweatherlinks = [];


app.engine('hbs',hbs({extname: 'hbs', dfaultLayout: 'layout', layoutDir: __dirname + '/views/layout'}));
app.engine('hbs',hbs({extname: 'hbs', partialsDir: __dirname + '/views/partials'}));
app.set('view engine', 'hbs');

app.set('views' + __dirname + 'views');

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/Pictures', express.static(__dirname + '/Pictures'));
app.use('/stylesheet', express.static(__dirname + '/stylesheet'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/views/partials', express.static(__dirname + '/views/partials'));
app.use(session({secret:'shh', resave: false, saveUninitialized: true}));

app.use('/',router);

mongoose.connect("mongodb://localhost:27017/web-scrape-proj");
var db = mongoose.connection;

var latestheadlinesSchema = mongoose.Schema({
 url: String,
 title: String,
 created: {
       type: Date,
       default: Date.now
   }
});

var mainnewsSchema = mongoose.Schema({
 url: String,
 title: String,
 imagelink: String,
 created: {
       type: Date,
       default: Date.now
   }
});

var entnewsSchema = mongoose.Schema({
 url:String,
 title: String,
 imagelink: String,
 created: {
       type: Date,
       default: Date.now
   }
});

var sportsnewsSchema = mongoose.Schema({
 url: String,
 title: String,
 imagelink: String,
 created: {
       type: Date,
       default: Date.now
   }
});

var worldnewsSchema = mongoose.Schema({
 url: String,
 title: String,
 imagelink: String,
 created: {
       type: Date,
       default: Date.now
   }
});

var maingallerySchema = mongoose.Schema({
  url: String,
  title: String,
  imagelink: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var headgallerySchema = mongoose.Schema({
  url: String,
  title: String,
  imagelink: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var featuregallerySchema = mongoose.Schema({
  url: String,
  title: String,
  imagelink: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var headweatherSchema = mongoose.Schema({
  url: String,
  title: String,
  imagelink: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var featureweatherSchema = mongoose.Schema({
  url: String,
  title: String,
  imagelink: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var mainweatherSchema = mongoose.Schema({
  url: String,
  title: String,
  imagelink: String,
  created: {
    type: Date,
    default: Date.now
  }
});

var latestheadlines = mongoose.model('latestheadlines', latestheadlinesSchema);
var mainnews = mongoose.model('mainnews', mainnewsSchema);
var entnews = mongoose.model('entnews', entnewsSchema);
var sportsnews = mongoose.model('sportsnews', sportsnewsSchema);
var worldnews = mongoose.model('worldnews', worldnewsSchema);
var maingallery = mongoose.model('maingallery', maingallerySchema);
var headgallery = mongoose.model('headgallery', headgallerySchema);
var featuregallery = mongoose.model('featuregallery', featuregallerySchema);
var headweather = mongoose.model('headweather', headweatherSchema);
var featureweather =  mongoose.model('featureweather', featureweatherSchema);
var mainweather =  mongoose.model('mainweather', mainweatherSchema);

router.get('/', function(req, res, next){
res.render(__dirname + '/views/aboutus')
});

router.get('/news', function(req, res, next){

  request('https://www.hindustantimes.com/entertainment/', function(error, response, html){
    if(!error && response.statusCode == 200)
    {
      var $ = cheerio.load(html);
      $('.latest-news-morenews.more-latest-news.more-separate .media-heading.headingfour a').each(function(i, element){
        var an = $(this);
        var enturl = an.attr('href');
        var enthead = an.text();
        enturls.push(enturl);
        entheads.push(enthead);
      });

      $('.latest-news-morenews.more-latest-news.more-separate .media-img img').each(function(i, element){
        var an = $(this);
        var entimglink = an.attr('src');
        entimglinks.push(entimglink);
      });
      for(var i = 0; i < enturls.length; i++)
      {
        var savedata_3 = new entnews({
          url: enturls[i],
          title: entheads[i],
          imagelink: entimglinks[i]
        });

        var EntNews = new entnews(savedata_3);

        EntNews.save(function(err, result){
          if(err)
          {
            console.log(err);
          }
          if(result)
          {
            console.log("inserted");
          }
        })
      }
    }
  });

  request('https://www.hindustantimes.com/sports-news/',function(error, response, html){
    if(!error && response.statusCode == 200){
      var $ = cheerio.load(html);

      $('.latest-news-morenews.more-latest-news.more-separate .media-heading.headingfour a').each(function(i, element){
        var an = $(this);
        var sporturl = an.attr('href');
        var sporthead = an.text();
        sporturls.push(sporturl);
        sportheads.push(sporthead);
      });

      $('.latest-news-morenews.more-latest-news.more-separate .media-img img').each(function(i,element){
        var an = $(this);
        var sportimglink = an.attr('src');
        sportimglinks.push(sportimglink);
      });

      for(var i = 0; i < sporturls.length; i++)
      {
        var savedata_4 = new sportsnews({
          url: sporturls[i],
          title: sportheads[i],
          imagelink: sportimglinks[i]
        });

        var SportsNews = new sportsnews(savedata_4);

        SportsNews.save(function(err, result){
          if(err){
            console.log(err);
          }
          if(result)
          {
            console.log("inserted");
          }
        })
      }
    }
  });

  request('https://www.hindustantimes.com/world-news/',function(error, response, html){
    if(!error && response.statusCode == 200){
      var $ = cheerio.load(html);

      $('.latest-news-morenews.more-latest-news.more-separate .media-heading.headingfour a').each(function(i, element){
        var an = $(this);
        var worldurl = an.attr('href');
        var worldhead = an.text();
        worldurls.push(worldurl);
        worldheads.push(worldhead);
      });

      $('.latest-news-morenews.more-latest-news.more-separate .media-img img').each(function(i,element){
        var an = $(this);
        var worldimglink = an.attr('src');
        worldimglinks.push(worldimglink);
      });

      for(var i = 0; i < worldurls.length; i++)
      {
        var savedata_5 = new worldnews({
        url: worldurls[i],
        title: worldheads[i],
        imagelink: worldimglinks[i]
      });

        var WorldNews = new worldnews(savedata_5);

        WorldNews.save(function(err, result){
        if(err)
          {
            console.log(err);
          }
        if(result)
          {
            console.log("inserted");
          }
        })
      }
      }
    });

    request('https://www.hindustantimes.com/latest-news/', function(error, result, html) {
      if (!error && result.statusCode == 200) {
        var $ = cheerio.load(html);
        $('.latest-news-bx.more-latest-news.more-separate .media-heading.headingfour a').each(function(i, element){
          var an = $(this);
          var url = an.attr('href');
          var title = an.text();
          urls.push(url);
          titles.push(title);
        });

      for(var i = 0; i < urls.length; i++)
      {
        var savedata_1 = new latestheadlines({
          url: urls[i],
          title: titles[i]
        });

        var LatestHeadlines = new latestheadlines(savedata_1);

        LatestHeadlines.save(function(err, result){
          if(err)
          {
            console.log(err);
          }
          if(result)
          {
            console.log("inserted");
          }
        });
      }
}
});

  request('https://www.hindustantimes.com/', function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $('.big-middlenews .bigstory-h2 a').each(function(i, element){
        var an = $(this);
        var mainurl = an.attr('href');
        var mainhead = an.text();
        mainurls.push(mainurl);
        mainheads.push(mainhead);
      });

        $('.big-middlenews .bigtopblk-imgbox img').each(function(i, element){
          var an = $(this);
          var imglink = an.attr('src');
          imglinks.push(imglink);
        });

    for(var i = 0; i < mainurls.length; i++)
    {
      var savedata_2 = new mainnews({
        url: mainurls[i],
        title: mainheads[i],
        imagelink: imglinks[i]
      });

      var MainNews = new mainnews(savedata_2);

      MainNews.save(function(err, result){
        if(err)
        {
          console.log(err);
        }
        if(result)
        {
          console.log("inserted");
        }
      });
    }
  }
});

latestheadlines.find({}).sort({"created": -1}).limit(6).exec(function(err, result){
  if(err)
  {
    console.log(err);
  }
  if(result)
  {
    var resultarray = [];
    resultarray.push(result)
  }

  mainnews.find({}).sort({"created": -1}).limit(1).exec(function(err, result_main){
    if(err)
    {
      console.log(err);
    }
    if(result_main)
    {
      var mainresultarray = [];
      mainresultarray.push(result_main);
      console.log(mainresultarray);
    }

    entnews.find({}).sort({"created": -1}).limit(4).exec(function(err, result_ent){
      if(err)
      {
        console.log(err);
      }
      if(result_ent)
      {
        var entresultarray = [];
        entresultarray.push(result_ent);
      }

      worldnews.find({}).sort({"created": -1}).limit(4).exec(function(err, result_world){
        if(err)
        {
          console.log(err);
        }
        if(result_world)
        {
          var worldresultarray = [];
          worldresultarray.push(result_world);
        }

        sportsnews.find({}).sort({"created": -1}).limit(4).exec(function(err, result_sport){
          if(err)
          {
            console.log(err);
          }
          if(result_sport)
          {
            var sportresultarray = [];
            sportresultarray.push(result_sport);
          }

    res.render('news',{records: resultarray, main_records: mainresultarray, ent_records: entresultarray, world_records: worldresultarray, sport_records: sportresultarray});
});
});
});
});
});
});

router.get('/gallery', function(req, res,next){

  request('https://www.hindustantimes.com/', function(error, response, html){
    if(!error && response.statusCode == 200)
    {
      var $ = cheerio.load(html);
      $('.news-area .photo-ar .hmnew-photo-ar .hm-newgallery-left .hm-slider-main .item img').each(function(i, element){
        var an = $(this);
        var mainimglink = an.attr('src');
        maingallerylinks.push(mainimglink);
      });

      $('.news-area .photo-ar .hmnew-photo-ar .hm-newgallery-right .headingfour #pgcaption').each(function(i, element){
        var an = $(this);
        var mainurl = an.attr('href');
        var maintitle = an.text();
        maingalleryurls.push(mainurl);
        maingallerytitle.push(maintitle);
      });


      for(var i = 0; i < maingalleryurls.length; i++)
      {
        var savedata_6 = new maingallery({
          url: maingalleryurls[i],
          title: maingallerytitle[i],
          imagelink: maingallerylinks[i]
        });

      var MainGallery = new maingallery(savedata_6);

        MainGallery.save(function(err, result_maingallery){
          if(err)
          {
            console.log(err);
          }
          if(result_maingallery)
          {
            console.log("inserted");
          }
        });
      }
    }
  });

  request('https://www.hindustantimes.com/photos/', function(error, response, html){
    if(!error && response.statusCode == 200)
    {
      var $ = cheerio.load(html);
      $('.latest-news-bx.row.1 .headingfive.media-heading a').each(function(i, element){
        var an = $(this);
        var featureurl = an.attr('href');
        var featuretitle = an.text();
        featuregalleryurls.push(featureurl);
        featuregallerytitle.push(featuretitle);
      });

      $('.latest-news-bx.row.1 .media-img.relative-icons img').each(function(i, element){
        var an = $(this);
        var featurelink = an.attr('src');
        featuregallerylinks.push(featurelink);
      });

      for(var i = 0; i < featuregalleryurls.length; i++)
      {
        var savedata_7 = new featuregallery({
          url: featuregalleryurls[i],
          title: featuregallerytitle[i],
          imagelink: featuregallerylinks[i]
        });

      var FeatureGallery = new featuregallery(savedata_7);

        FeatureGallery.save(function(err, result_featured){
          if(err)
          {
            console.log(err);
          }
          if(result_featured)
          {
            console.log("inserted");
          }
        });
      }
    }
  });

  request('https://indianexpress.com/photos/', function(error, response, html){
    if(!error && response.statusCode == 200)
    {
      var $ = cheerio.load(html);
      $('.rightpanel .express-best ul li img').each(function(i, element){
        var an = $(this);
        var headimglink = an.attr('src');
        headgallerylinks.push(headimglink);

      });

      $('.rightpanel .express-best ul li .padding').each(function(i, element){
        var an = $(this);
        var headurl = an.attr('href');
        var headtitle = an.text();
        headgalleryurls.push(headurl);
        headgallerytitle.push(headtitle);
      });

      for(var i = 0; i < headgalleryurls.length; i++)
      {
        var savedata_8 = new headgallery({
          url: headgalleryurls[i],
          title: headgallerytitle[i],
          imagelink: headgallerylinks[i]
        });

      var HeadGallery = new headgallery(savedata_8);

        HeadGallery.save(function(err, result_head){
          if(err)
          {
            console.log(err);
          }
          if(result_head)
          {
            console.log("inserted");
          }
        });
      }
    }
  });

  maingallery.find({}).sort({"created": -1}).limit(1).exec(function(err, result){
    if(err)
    {
      console.log(err);
    }
    if(result)
    {
      var resultarray = [];
      resultarray.push(result)
    }

    featuregallery.find({}).sort({"created": -1}).limit(5).exec(function(err, feature_result){
      if(err)
      {
        console.log(err);
      }
      if(feature_result)
      {
        var featureresultarray = [];
        featureresultarray.push(feature_result);
      }

    headgallery.find({}).sort({"created": -1}).limit(2).exec(function(err, head_result){
        if(err)
        {
          console.log(err);
        }
        if(head_result)
        {
          var headresultarray = [];
          headresultarray.push(head_result);
        }
        res.render('gallery',{records: resultarray, feature_records: featureresultarray, head_records: headresultarray});
  });
});
});
});

router.get('/weather', function(req, res, next){

  request('https://weather.com/en-IN/', function(error, response, html){
    if(!error && response.statusCode == 200)
    {
      var $ = cheerio.load(html);
      $('.wx-media-group.body img').each(function(i, element){
        var an = $(this);
        var headimglink = an.attr('src');
        headweatherlinks.push(headimglink);
      });

      $('.wx-media-group.body .wx-media-object .headline-link').each(function(i, element){
        var an = $(this);
        var headurl = an.attr('href');
        var headtitle = an.text();
        headweatherurls.push(headurl);
        headweathertitle.push(headtitle);
      });

      for(var i = 0; i < headweatherurls.length; i++)
      {
        var savedata_9 = new headweather({
          url: headweatherurls[i],
          title: headweathertitle[i],
          imagelink: headweatherlinks[i]
        });

      var HeadWeather = new headweather(savedata_9);

        HeadWeather.save(function(err, result_head){
          if(err)
          {
            console.log(err);
          }
          if(result_head)
          {
            console.log("inserted");
          }
        });
      }
    }
  });

  request('https://weather.com/en-IN/india/news', function(error, response, html){
    if(!error && response.statusCode == 200)
    {
      var $ = cheerio.load(html);
      $('.styles__listGroup__2KdNm .styles__image__18yIG').each(function(i, element){
        var an = $(this);
        var featureimglink = an.attr('src');
        featureweatherlinks.push(featureimglink);
      });

      $('.styles__listGroup__2KdNm .styles__listItemContainer__2-Sax').each(function(i, element){
        var an = $(this);
        var featureurl = an.attr('href');
        featureweatherurls.push(featureurl);
      });

      $('.styles__listGroup__2KdNm .styles__wxTitleWrap__GHFr8 .styles__headline__1WDSw').each(function(i, element){
        var an = $(this);
        var featuretitle = an.text();
        featureweathertitle.push(featuretitle);
      });

      for(var i = 0; i < featureweatherurls.length; i++)
      {
        var savedata_10 = new featureweather({
          url: featureweatherurls[i],
          title: featureweathertitle[i],
          imagelink: featureweatherlinks[i]
        });

      var FeatureWeather = new featureweather(savedata_10);

        FeatureWeather.save(function(err, result_feature){
          if(err)
          {
            console.log(err);
          }
          if(result_feature)
          {
            console.log("inserted");
          }
        });
      }
    }
  });

  request('https://weather.com/en-IN/weather/today/l/INXX0038:1:IN', function(error, response, html){
    if(!error && response.statusCode == 200)
    {
      var $ = cheerio.load(html);
      $('.styles__aspectRatioPlaceholder__2_6II .styles__progressiveMedia__ytAV_ .styles__image__18yIG').each(function(i, element){
        var an = $(this);
        var mainimglink = an.attr('src');
        mainweatherlinks.push(mainimglink);
      });

      $('.wx-media-object .headline-link').each(function(i, element){
        var an = $(this);
        var mainurl = an.attr('href');
        var maintitle = an.text();
        mainweatherurls.push(mainurl);
        mainweathertitle.push(maintitle);
      });

      for(var i = 0; i < mainweatherurls.length; i++)
      {
        var savedata_11 = new mainweather({
          url: mainweatherurls[i],
          title: mainweathertitle[i],
          imagelink: mainweatherlinks[i]
        });

      var MainWeather = new mainweather(savedata_11);

        MainWeather.save(function(err, result_main){
          if(err)
          {
            console.log(err);
          }
          if(result_main)
          {
            console.log("inserted");
          }
        });
      }
    }
  });
  mainweather.find({}).sort({"created": -1}).limit(1).exec(function(err, result){
    if(err)
    {
      console.log(err);
    }
    if(result)
    {
      var resultarray = [];
      resultarray.push(result)
    }

    featureweather.find({}).sort({"created": -1}).limit(3).exec(function(err, feature_result){
      if(err)
      {
        console.log(err);
      }
      if(feature_result)
      {
        var featureresultarray = [];
        featureresultarray.push(feature_result);
      }

    headweather.find({}).sort({"created": -1}).limit(3).exec(function(err, head_result){
        if(err)
        {
          console.log(err);
        }
        if(head_result)
        {
          var headresultarray = [];
          headresultarray.push(head_result);
        }
        res.render('weather',{records: resultarray, feature_records: featureresultarray, head_records: headresultarray});
  });
});
});
});
