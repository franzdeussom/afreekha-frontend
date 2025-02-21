import { Routes } from '@angular/router';
import { ProductResolver } from '../../shared/resolvers/product.resolver';
import { StoreResolver } from '../../shared/resolvers/store.resolver';

// Components
import { CartComponent } from './cart/cart.component';
import { CompareComponent } from './compare/compare.component';
import { WishlistComponent } from './wishlist/wishlist.component';

// Seller
import { SellerDetailsComponent } from './seller/seller-details/seller-details.component';
import { SellerStoreComponent } from './seller/seller-store/seller-store.component';
import { SellerComponent } from './seller/seller.component';

// Product
import { ProductComponent } from './product/product.component';

// Collection
import { CollectionComponent } from './collection/collection.component';

// Checkout
import { ScrollPositionGuard } from '../../shared/guard/scroll.guard';
import { CheckoutComponent } from './checkout/checkout.component';

export default [
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'compare',
    component: CompareComponent,
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'product/:slug',
    component: ProductComponent,
    resolve: {
      data: ProductResolver
    },
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'collections',
    component: CollectionComponent,
    canActivate: [ScrollPositionGuard],
  },
  {
    path: 'seller/become-seller',
    component: SellerComponent
  },
  {
    path: 'seller/stores',
    component: SellerStoreComponent
  },
  {
    path: 'seller/store/:slug',
    component: SellerDetailsComponent,
    resolve: {
      data: StoreResolver
    }
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
] as Routes;


