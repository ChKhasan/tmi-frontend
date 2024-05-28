import type {
  ICitizenship,
  ICountry,
  IDirections,
  IEducationTypeList,
  IRegion,
} from '~/types/services/common.types'
import type { IResponse } from '~/types/common/serverResponse'
import {
  IEducationDirectionDetails,
  IEmployment,
} from '~/types/services/education.types'

export const useCommonStore = defineStore('common', {
  state: () => ({
    citizenship: [] as ICitizenship[],
    region: [] as IRegion[],
    country: [] as ICountry[],
    programmes: [] as IEducationTypeList[],
    directions: [] as IDirections[],
    employmentLists: [] as IEmployment[],
    organizationStructure: []
  }),

  actions: {
    fetchOrganizationStructure() {
      return new Promise((resolve, reject) => {
        useApi()
            .$get(`common/DepartmentsAndSections/`)
            .then((data: any) => {
              this.organizationStructure = data
              console.log(data)
              this.organizationStructure?.children?.push(
                  {
                    title: 'our_story',
                    slug: 'our-story',
                    front_url: '/about-us/our-story',
                    children: null,
                  },
                  {
                    title: 'our_mission',
                    slug: 'our-mission',
                    front_url: '/about-us/our-mission',
                    children: null,
                  }
              )
              resolve(data)
            })
            .catch((error) => {
              reject(error)
            })
      })
    },
    getCitizenship(): Promise<IResponse<ICitizenship>> {
      return new Promise<IResponse<ICitizenship>>((resolve, reject) => {
        useApi()
          .$get('/common/CitizenshipList/')
          .then((res: IResponse<ICitizenship>) => {
            console.log(res)
            this.citizenship = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getRegion(): Promise<IResponse<IRegion>> {
      return new Promise<IResponse<IRegion>>((resolve, reject) => {
        useApi()
          .$get('/common/RegionList/')
          .then((res: IResponse<IRegion>) => {
            this.region = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getCountry(): Promise<IResponse<ICountry>> {
      return new Promise<IResponse<ICountry>>((resolve, reject) => {
        useApi()
          .$get('common/CountryList/')
          .then((res: IResponse<ICountry>) => {
            this.country = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getProgrammes(): Promise<IResponse<IEducationTypeList>> {
      return new Promise<IResponse<IEducationTypeList>>((resolve, reject) => {
        useApi()
          .$get('/education/EducationTypeList/')
          .then((res: IResponse<IEducationTypeList>) => {
            this.programmes = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getDirections(slug: string): Promise<IResponse<IDirections>> {
      return new Promise<IResponse<IDirections>>((resolve, reject) => {
        useApi()
          .$get('education/DirectionList/', {
            params: { education_type__slug: slug },
          })
          .then((res: IResponse<IDirections>) => {
            this.directions = res.results
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },

    getEmployment(params?: {
      department__slug?: string
      is_leader?: string
      directions__direction__slug?: string
      search?: string
      limit?: number
      offset?: number
    }): Promise<IResponse<IEmployment>> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IEmployment>>(`common/EmployeeList/`, {
            params,
          })
          .then((res) => {
            this.employmentLists = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
