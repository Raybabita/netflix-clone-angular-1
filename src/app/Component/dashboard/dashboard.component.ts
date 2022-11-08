import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  latestMovie: any;
  popularMovies !: Movie;
  nowPlayingMovies!: Movie;
  topRatedMovies!: Movie;
  upComingMovies !: Movie;
  trendingMovies!: Movie;
  originals!: Movie;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getLatestMovies();
    this.getNowPlayingMovies();
    this.getOriginals();
    this.getPopularMovies();
    this.getTopRatedMovies();
    this.getTrendingMovies();
    this.getUpcomingMovies();
  }

  getLatestMovies() {
    this.dataService.getLatestMovies().subscribe(res => {
      this.latestMovie = this.changeData(res);
    }, err => {
      console.log("error while fetching popular movies", err);
    })
  }
  changeData(res: any): any {
    if (!res.backdrop_path) {
      res.backdrop_path = 'https://image.tmdb.org/t.p/original' + res.poster_path + '?api_key=' + environment.api_key;
    } else {
      res.backdrop_path = 'https://image.tmdb.org/t.p/original' + res.backdrop_path + '?api_key=' + environment.api_key;
    }
    return res;
  }



  getPopularMovies() {
    this.dataService.getPopularMovies().subscribe(res => {
      this.popularMovies = this.modifyData(res);

    }, err => {
      console.log("error while fetching popular movies", err);
    })
  }

  getNowPlayingMovies() {
    this.dataService.getNowPlayingMovies().subscribe(res => {
      this.nowPlayingMovies = this.modifyData(res);
    }, err => {
      console.log("error while fetchingnow playing movies", err);
    })
  }


  getTopRatedMovies() {
    this.dataService.getTopRatedMovies().subscribe(res => {
      this.topRatedMovies = this.modifyData(res);
    }, err => {
      console.log("error while fetching top rated movies", err);
    })
  }

  getUpcomingMovies() {
    this.dataService.getUpcomingMovies().subscribe(res => {
      this.upComingMovies = this.modifyData(res);

    }, err => {
      console.log("error while fetching upcoming movies", err);
    })
  }


  getTrendingMovies() {
    this.dataService.getTrendingMovies().subscribe(res => {
      this.trendingMovies = this.modifyData(res);
    }, err => {
      console.log("error while fetching trending movies", err);
    })
  }
  getOriginals() {
    this.dataService.getOriginals().subscribe(res => {
      this.originals = this.modifyData(res);
    }, err => {
      console.log("error while fetching original movies", err);
    })
  }


  modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach(element => {
        element.backdrop_path = 'https://image.tmdb.org/t/p/original' + element.backdrop_path + '?api_key=' + environment.api_key;
        if (!element.title) {
          element.title = element?.name;
        }
      });
    }
    return movies;
  }


}

