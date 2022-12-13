import { useContext, Fragment } from 'react'
import { useSelector } from 'react-redux'

import CategoryPreview from '../../components/category-preview/category-preview.component'

import { selectCategoriesMap } from '../../store/categories/category.selector'

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap)
	return (
		<Fragment>
			{Object.keys(categoriesMap).map((title) => (
				<CategoryPreview
					key={title}
					title={title}
					products={categoriesMap[title]}
				/>
			))}
		</Fragment>
	)
}

export default CategoriesPreview
