import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetProducts, GetStoreProducts, 
         GetRelatedProducts, GetProductBySlug, GetDealProducts, 
         } from "../action/product.action";
import { Product, ProductModel } from "../interface/product.interface";
import { ProductService } from "../services/product.service";
import { ThemeOptionService } from "../services/theme-option.service";
import { CategoryState } from "./category.state";
import { CryptoJsService } from "../services/crypto-js.service";
import { HomeState } from "./home.state";
import { HomeData } from "../interface/account.interface";

export class ProductStateModel {
  product = {
    data: [] as Product[],
    total: 0
  }
  selectedProduct: Product | null;
  categoryProducts: Product[] | [];
  relatedProducts: Product[] | [];
  storeProducts: Product[] | [];
  dealProducts: Product[] | [];
}

@State<ProductStateModel>({
  name: "product",
  defaults: {
    product: {
      data: [],
      total: 0
    },
    selectedProduct: null,
    categoryProducts: [],
    relatedProducts: [],
    storeProducts: [],
    dealProducts: []
  },
})
@Injectable()
export class ProductState {
  public offset = 0;
  public allLoaded = false;
  public loading = false;
  public offsetReset = false;

  public isUniqueFilter = false;

  constructor(private store: Store, private router: Router,
    private productService: ProductService, 
    private crypt: CryptoJsService,
    private themeOptionService: ThemeOptionService) {}

  @Selector()
  static product(state: ProductStateModel) {
    return state.product;
  }

  @Selector()
  static selectedProduct(state: ProductStateModel) {
    return state.selectedProduct;
  }

  @Selector()
  static relatedProducts(state: ProductStateModel) {
    return state.relatedProducts;
  }

  @Selector()
  static storeProducts(state: ProductStateModel) {
    return state.storeProducts;
  }

  @Selector()
  static dealProducts(state: ProductStateModel) {
    return state.dealProducts;
  }

  @Action(GetProducts)
  getProducts(ctx: StateContext<ProductStateModel>, action: GetProducts) {
    this.productService.skeletonLoader = true;

    const appliedFilter = (products: Product[], total?: number)=>{
      if(products) {
        if(action?.payload?.['sortBy']) {
          if(action?.payload?.['sortBy'] === 'asc') {
            products = products.sort((a, b) => {
              if (a.idArticle < b.idArticle) {
                return -1;
              } else if (a.idArticle > b.idArticle) {
                return 1;
              }
              return 0;
            })
          } else if(action?.payload?.['sortBy'] === 'desc') {
            products = products.sort((a, b) => {
              if (a.idArticle > b.idArticle) {
                return -1;
              } else if (a.idArticle < b.idArticle) {
                return 1;
              }
              return 0;
            })
          } else if (action?.payload?.['sortBy'] === 'a-z') {
            products = products.sort((a, b) => {
              if (a.nom_article < b.nom_article) {
                return -1;
              } else if (a.nom_article > b.nom_article) {
                return 1;
              }
              return 0;
            })
          } else if (action?.payload?.['sortBy'] === 'z-a') {
            products = products.sort((a, b) => {
              if (a.nom_article > b.nom_article) {
                return -1;
              } else if (a.nom_article < b.nom_article) {
                return 1;
              }
              return 0;
            })
          } else if (action?.payload?.['sortBy'] === 'low-high') {
            products = products.sort((a, b) => {
              if (a.prix < b.prix) {
                return -1;
              } else if (a.prix > b.prix) {
                return 1;
              }
              return 0;
            })
          } else if (action?.payload?.['sortBy'] === 'high-low') {
            products = products.sort((a, b) => {
              if (a.prix > b.prix) {
                return -1;
              } else if (a.prix < b.prix) {
                return 1;
              }
              return 0;
            })
          } 
        } else if(!action?.payload?.['ids']) {
          products = products.sort((a, b) => {
            if (a.idArticle < b.idArticle) {
              return -1;
            } else if (a.id > b.id) {
              return 1;
            }
            return 0;
          })
        }

      }

      if(action?.payload?.['search']) {
        products = products.filter(product => product.nom_article.toLowerCase().includes(action?.payload?.['search'].toLowerCase()))
      }
      ctx.patchState({
        product: {
          data: this.offsetReset ? products : (ctx.getState().product.data.length > 0 ? [...ctx.getState().product.data, ...products]: products),
          total: total ? total : 0
        }
      });
      this.productService.skeletonLoader = false;

      return 0;
    }
    // Note :- You must need to call api for filter and pagination as of now we are using json data so currently get all data from json 
    //          you must need apply this logic on server side
    if(!action?.payload?.['attribute']){
        delete action?.payload?.['attribute'];
    }
    if(!action.payload?.['category']){
      delete action?.payload?.['category']
    }

    if(this.isUniqueFilter){
      if (action.payload) {
        action.payload['isUniqueFilter'] = this.isUniqueFilter;
      }
    }
    this.productService.getProduct(this.offset, action.payload).subscribe((data: any)=>{
        if(data.length > 0){

          let products = this.crypt.decryptData(data[0].data) as Product[];
          this.offset += products.length;     
          this.allLoaded = false;

          appliedFilter(products, data[0].total);
        }else{
          this.allLoaded = true;
          this.productService.skeletonLoader = false;

          return 0;
        }
    })

  }

  @Action(GetRelatedProducts)
  getRelatedProducts(ctx: StateContext<ProductStateModel>, action: GetProducts) {
    this.themeOptionService.preloader = true;
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result: ProductModel) => {
          const state = ctx.getState();
          const products = result.data.filter(product => 
              action?.payload?.['ids']?.split(',')?.map((id: number) => Number(id)).includes(product.id) ||
              (product?.categories.length && product?.categories?.map(category => category.id).includes(Number(action?.payload?.['category_ids'])))
          );
          ctx.patchState({
            ...state,
            relatedProducts: products
          });
        },
        complete: () => {
          this.themeOptionService.preloader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetStoreProducts)
  getStoreProducts(ctx: StateContext<ProductStateModel>, action: GetProducts) {
    return this.productService.getProducts(action.payload).pipe(
      tap({
        next: (result: ProductModel) => {
          const state = ctx.getState();
          const products = result.data.filter(product => 
            action?.payload?.['store_ids']?.split(',')?.map((id: number) => Number(id)).includes(product.store_id));
          ctx.patchState({
            ...state,
            storeProducts: products
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetProductBySlug)
  getProductBySlug(ctx: StateContext<ProductStateModel>, { slug }: GetProductBySlug) {
    this.themeOptionService.preloader = true;
    const product = ctx.getState().product.data.find(product => product.idArticle == Number.parseInt(slug));
    if(product) {
      //product category
      ctx.patchState({
        selectedProduct: product
      });
      this.themeOptionService.preloader = false;
      return 0;
    }else{
      let homeProduct = this.store.selectSnapshot(HomeState.homeData) as HomeData;

      if(homeProduct){

        let products: Product[] = [
          ...homeProduct.firt_section.article,
          ...homeProduct.third_section.article,
          ...homeProduct.secode_section.article,
          ...homeProduct.fourth_section.article
        ];
          let product = products.find((value)=> value.idArticle == Number.parseInt(slug));
            console.log('product searhc', products);
            console.log('product home', homeProduct.firt_section.article);
        
            ctx.patchState({
              selectedProduct : product 
            })
            
            this.themeOptionService.preloader = false;
            return 0;
      }else{
        this.themeOptionService.preloader = false;
  
        this.router.navigate(['/404']);
      } 
    }
    
  }

  @Action(GetDealProducts)
  getDealProducts(ctx: StateContext<ProductStateModel>, action: GetDealProducts) {
  
    const homeArticle = this.store.selectSnapshot(HomeState.homeData) as HomeData;
    if(homeArticle){
     const promoArticles = homeArticle.secode_section ? homeArticle.secode_section.article : [];
      
     if(promoArticles.length > 0){
        //process to 3 ramdom on promoArticle
        const randomArticles = promoArticles
        .sort(() => 0.5 - Math.random()) // Mélange aléatoire des articles
        .slice(0, (promoArticles.length >= 3 ? 3: promoArticles.length)); // Prendre les 3 premiers articles après mélange
        ctx.patchState({
          dealProducts : randomArticles 
        });
        return;
      }
    }
    return;
  }
}
