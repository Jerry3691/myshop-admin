import { ModifiedCategoryList } from "./../models/category.model";
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Category } from "../models/category.model";
import { HttpService } from "./http.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$: Observable<Category[]> = this.categoriesSubject.asObservable();
  private modifiedCategoryListSubject = new BehaviorSubject<
    ModifiedCategoryList[]
  >([]);
  modifiedCategoryList$: Observable<ModifiedCategoryList[]> =
    this.modifiedCategoryListSubject.asObservable();
  private modifiedCategoryDropdownListSubject = new BehaviorSubject<
    ModifiedCategoryList[]
  >([]);
  modifiedCategoryDropdownList$: Observable<ModifiedCategoryList[]> =
    this.modifiedCategoryDropdownListSubject.asObservable();
  totalCount = 0;

  constructor(private httpService: HttpService) { }

  sorter = (a: any, b: any) => {
    if (!a.category && b.category) {
      return 1;
    }
    if (a.category && !b.category) {
      return -1;
    }
    if (
      a.category &&
      b.category &&
      a.category.toLowerCase() < b.category.toLowerCase()
    ) {
      return -1;
    }
    if (
      a.category &&
      b.category &&
      a.category.toLowerCase() > b.category.toLowerCase()
    ) {
      return 1;
    }
    return 0;
  };

  addCategory = (data: Partial<Category>) => {
    return this.httpService.postRequest("category", data).pipe(
      tap((res: any) => {
        const categories = this.categoriesSubject.getValue();
        categories.push(res.response);
        categories.sort(this.sorter);

        this.categoriesSubject.next([...categories]);
        this.modifiedCategoryListSubject.next(this.nest([...categories]));
        this.modifiedCategoryDropdownListSubject.next(this.nest2([...categories]))
      })
    );
  };

  nest = (items: any, id = null, link = "parent_id") =>
    items
      .filter((item: any) => item[link] === id)
      .map((item: any) => {
        return { ...item, subcategories: this.nest(items, item.id) };
      });
  nest2 = (items: any, id = null, link = "parent_id") =>
    items
      .filter((item: any) => item[link] === id)
      .map((item: any) => {
        return {
          "label": item.name,
          "data": item.id,
          "children": this.nest2(items, item.id)
        };
      });

  getCategoriesList = (
    perPage: number,
    page: number = 1,
    search: string = ""
  ) => {
    let params = new HttpParams();
    if (perPage) {
      params = params.set("per_page", perPage);
    }
    if (search) {
      params = params.set("search", search);
    }
    if (page) {
      params = params.set("page", page);
    }
    return this.httpService.getRequest("category", params).pipe(
      tap((res: any) => {
        this.categoriesSubject.next(res.response);
        this.totalCount = res?.totalCount || 0;
        const modifiedList = this.nest(res.response)
        this.modifiedCategoryListSubject.next(modifiedList);
        this.modifiedCategoryDropdownListSubject.next(this.nest2(res.response))
      })
    );
  };
  getCategoryDetails = (catId: number) => {
    const categories = this.categoriesSubject.getValue();
    const index = categories.findIndex((cat) => cat.id === catId);

    if (index > -1) {
      return of({ response: categories[index] });
    } else {
      return this.httpService.getRequest("category/" + catId);
    }
  };
  updateCategory = (catId: number, data: Partial<Category>) => {
    return this.httpService.patchRequest("category/" + catId, data).pipe(
      tap((res: any) => {
        const categories = this.categoriesSubject.getValue();
        const index = categories.findIndex((cat) => cat.id == catId);
        if (index > -1) {
          categories[index] = {
            ...categories[index],
            ...res.response,
          };
          categories.sort(this.sorter);
          this.categoriesSubject.next([...categories]);

          this.modifiedCategoryListSubject.next(this.nest([...categories]));
          this.modifiedCategoryDropdownListSubject.next(this.nest2([...categories]));
        }
      })
    );
  };
  deleteCategory = (catId: number, index: number) => {
    return this.httpService.deleteRequest("category/" + catId)
  };
  setCategoryValueAfterDeleteCategory(id: number) {

    const categories = this.categoriesSubject.getValue();
    let index = categories.findIndex(e => e.id == id)
    categories.splice(index, 1);
    this.categoriesSubject.next(categories);
    this.modifiedCategoryListSubject.next(this.nest(categories));
  }
}
