import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Refresher } from 'ionic-angular';
import { PostServiceProvider } from '../../providers/post-service/post-service';

/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  searchText: string = '';
  todosLosPosts: any[] = [];

  posts: any[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private postService: PostServiceProvider,
    private loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.cargarPosts();
  }


  cargarPosts(refresher?: Refresher) {
    if (!refresher) {
      const loader = this.loadingCtrl.create({ content: 'Cargando posts...' });
      loader.present();
      this.postService.getPosts().subscribe((data: any[]) => {
        this.todosLosPosts = data;
        this.posts = data;
        loader.dismiss();
      }, err => {
        loader.dismiss();
        console.error('Error al cargar posts', err);
      });
    } else {
      this.postService.getPosts().subscribe((data: any[]) => {
        this.todosLosPosts = data;
        this.posts = data;
        refresher.complete();
      });
    }
  }

  filtrarPosts() {
    const texto = this.searchText.toLowerCase();
    this.posts = this.todosLosPosts.filter(post =>
      post.title.toLowerCase().includes(texto) ||
      post.body.toLowerCase().includes(texto)
    );
  }


}
