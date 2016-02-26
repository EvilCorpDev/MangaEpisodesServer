var cheerio = require('cheerio'),
	Entities = require('html-entities').XmlEntities,
	entities = new Entities();

var parserFns = {
	mangaFox :'http://mangafox.me/',
	mangaReader : 'http://www.mangareader.net/',
	readManga : 'http://readmanga.me/',
	readMangaToday : 'http://www.readmanga.today/',

	callParser : function (url, $data) {
		if(url.indexOf(this.mangaFox) === 0) {
			return this.getMangaObjMangaFox($data);
		} else if(url.indexOf(this.mangaReader) === 0) {
			return this.getMangaObjMangaReader($data);
		} else if(url.indexOf(this.readManga) === 0) {
			return this.getMangaObjReadManga($data);
		} else if(url.indexOf(this.readMangaToday) === 0) {
			return this.getReadMangaTodayObject($data);
		}
	},

	getMangaObjReadManga : function ($data) {	
		var manga = {};
		manga.episode = this.getEpisodeReadManga($data);
		manga.title = this.getTitleReadManga($data);
		return manga;
	},

	getMangaObjMangaFox : function ($data) {	
		var manga = {};
		manga.episode = this.getEpisodeMangaFox($data);
		manga.title = this.getTitleMangaFox($data);
		return manga;
	},

	getMangaObjMangaReader : function ($data) {	
		var manga = {};
		manga.episode = this.getEpisodeMangaReader($data);
		manga.title = this.getTitleMangaReader($data);
		return manga;
	},

	getReadMangaTodayObject : function ($data) {
		var manga = {};
		manga.episode = this.getEpisodeReadMangaToday($data);
		manga.title = this.getTitleReadMangaToday($data);
		return manga;	
	},

	getEpisodeReadManga : function ($data) {
		var $ =  cheerio.load($data);
		var href = $('.read-last > a').attr('href');
		return Number.parseInt(href.substr(href.lastIndexOf('/') + 1, href.number));
	},

	getTitleReadManga : function ($data) {
		var $ =  cheerio.load($data);
		var title = $('.name').html();
		console.log(entities.decode(title));
		title = entities.decode(title) + ' | ';
		title += $('.eng-name').html();
		return title;
	},

	getEpisodeMangaFox : function ($data) {
		var $ =  cheerio.load($data);
		var $chList = $('.chlist');
		var $link = $chList.find('h3').first().find('a');
		var href = $link.attr('href');
		href = href.substr(0, href.lastIndexOf('/'));
		return Number.parseInt(href.substr(href.lastIndexOf('/') + 2, href.number));
	},

	getTitleMangaFox : function ($data) {
		var $ =  cheerio.load($data);
		return $('#title').find('h1').html();
	},

	getEpisodeMangaReader : function ($data) {
		var $ =  cheerio.load($data);
		var $chList = $('#latestchapters');
		var href = $($chList.find('a').first()).attr('href');
		return Number.parseInt(href.substr(href.lastIndexOf('/') + 1, href.number));
	},

	getTitleMangaReader : function ($data) {
		var $ =  cheerio.load($data);
		return $('#mangaproperties').find('h1').html();	
	},

	getEpisodeReadMangaToday : function ($data) {
		var $ =  cheerio.load($data);
		var url = $('.chp_lst').find('a').first().attr('href');
		url = url.substr(url.lastIndexOf('/') + 1, url.length);
		return Number.parseInt(url);
	},

	getTitleReadMangaToday : function ($data) {
		var $ =  cheerio.load($data);
		return $('.panel-heading > h1').html();
	}
}

module.exports = parserFns;