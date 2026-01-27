import { useState, useEffect, useCallback, lazy, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Grid3x3Gap, List } from 'react-bootstrap-icons';

import CardProductGrid from '@components/frontend/card/CardProductGrid';
import CardProductList from '@components/frontend/card/CardProductList';
import ProductService from '@services/api/products';
import CategoryService from '@services/api/categories';
import Paging from '@components/Paging';
import { addItem } from '@redux/store/cartSlice';

const FilterCategory = lazy(
  () => import('@components/frontend/filter/FilterCategory')
);

export default function ProductsList() {
  const [view, setView] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('price_low');

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const productListRef = useRef(null);

  const effectiveCategory = searchTerm ? '' : selectedCategory;
  const pageLimit = 6;

  /* 🔥 ACCEPT CATEGORY FROM TOP MENU (NAVIGATION STATE) */
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
      setCurrentPage(1);
    }
  }, [location.state]);

  /* 🔥 FETCH PRODUCTS */
  const fetchProducts = useCallback(async () => {
    try {
      const res = await ProductService.getAll({
        page: currentPage,
        category: effectiveCategory,
        sort,
        search: searchTerm,
      });

      setProducts(res.result.products || []);
      setTotal(res.result.total || 0);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
      setTotal(0);
    }
  }, [currentPage, effectiveCategory, sort, searchTerm]);

  /* 🔥 FETCH CATEGORIES */
  const fetchCategories = useCallback(async () => {
    try {
      const result = await CategoryService.getAll();
      setCategories(result);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* 🔥 RESET PAGE ON FILTER CHANGE */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sort]);

  /* 🔥 SCROLL TO PRODUCT LIST AFTER DATA LOAD */
  useEffect(() => {
    if (location.state?.scrollTo === 'product-list' && productListRef.current) {
      productListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [products, location.state]);

  const onPageChanged = ({ currentPage }) => {
    setCurrentPage(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        productId: product.id,
        quantity: 1,
        productInfo: product,
      })
    );
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="w-100">
      {/* Banner */}
      <div
        className="bg-primary d-flex align-items-center"
        style={{
          backgroundImage: 'url("/images/banner/50-Banner.webp")',
          minHeight: '22vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container text-center">
          <span
            className="
        d-inline-block
        bg-white
        rounded
        shadow
        px-3 py-2
        fw-semibold
        fs-6 fs-sm-5 fs-md-4
        text-break
      "
            style={{ maxWidth: '100%' }}
          >
            {searchTerm ? searchTerm : selectedCategory}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="container-fluid my-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-3 mb-md-0">
            <FilterCategory
              selected={searchTerm ? '' : selectedCategory}
              categories={categories}
              onSelect={(cat) => {
                navigate('/products', {
                  state: {
                    scrollTo: 'product-list',
                    category: cat,
                  },
                });

                setSelectedCategory(cat);
              }}
            />
          </div>

          {/* Product List */}
          <div className="col-md-9">
            {/* Header */}
            <div className="row mb-3 align-items-center">
              <div className="col-md-6">
                <h6 className="fw-bold">
                  {products.length} result(s) for{' '}
                  <span className="text-warning">
                    "{searchTerm ? searchTerm : selectedCategory}"
                  </span>
                </h6>
              </div>

              <div className="col-md-6 d-flex justify-content-end align-items-center gap-2">
                <select
                  className="form-select w-50"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="price_low">Price low to high</option>
                  <option value="price_high">Price high to low</option>
                  <option value="latest">Latest items</option>
                </select>

                {/* View Toggle */}
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={() => setView('grid')}
                    className={`btn btn-sm ${
                      view === 'grid' ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                  >
                    <Grid3x3Gap size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('list')}
                    className={`btn btn-sm ${
                      view === 'list' ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* 🔥 PRODUCT GRID SCROLL TARGET */}
            <div
              className="row g-3"
              ref={productListRef}
              style={{ scrollMarginTop: '120px' }}
            >
              {products.length > 0 ? (
                products.map((product) =>
                  view === 'grid' ? (
                    <div className="col-md-4 mb-4" key={product.id}>
                      <CardProductGrid
                        data={product}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  ) : (
                    <div className="col-12" key={product.id}>
                      <CardProductList
                        data={product}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  )
                )
              ) : (
                <div className="col-12 text-muted">No products found.</div>
              )}

              {/* Pagination */}
              {products.length > 0 && (
                <div className="col-12">
                  <Paging
                    totalRecords={total}
                    pageLimit={pageLimit}
                    pageNeighbours={1}
                    onPageChanged={onPageChanged}
                    sizing="pagination-sm"
                    alignment="justify-content-center"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
