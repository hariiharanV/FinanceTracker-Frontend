import { useContext, useEffect, useState } from "react";
import { addNewInvestmentCategory, deleteInvestCategoryById, fetchAllInvestmentCategoriesByUser} from "../../investApi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";


const CollapseForInvestTypes = ({setInvestmentTypesModified}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [categoryTypes,setCategoryTypes] = useState([]);
    const [newCategoryVisible,setNewCategoryVisible] = useState(false)
    const [newCategory,setNewCategory] = useState('');

    const {userData} = useContext(AppContext)

    const fetchAllCategories = async()=>{

       const username = userData.email;

       const categoriesList = await fetchAllInvestmentCategoriesByUser(username);

       console.log(categoriesList)

        setCategoryTypes(categoriesList);

    }

    useEffect(()=>{

        fetchAllCategories();

    },[userData])


 const changeHandler = async(e)=>{
      e.preventDefault();

      if(!newCategory.trim())
      {
        toast.error("Category cannot be empty")
        return;
      }

      const categoryExists = categoryTypes.some((cat) => cat.category === newCategory);
      if (categoryExists) {
        toast.error(`${newCategory} Category Already Added`);
        setNewCategory('');
        setNewCategoryVisible(false);
        return;
      }

      const categoryData = {
        "category":newCategory,
        "username":userData.email
      }

      await addNewInvestmentCategory(categoryData);

      toast.success("New Category Added Successfully");

      setNewCategoryVisible(false);
      setNewCategory('');
      fetchAllCategories();
      setInvestmentTypesModified(true)

    }


    const deleteHandler = async(id)=>{

      await deleteInvestCategoryById(id);

      toast.error("Investment Category deleted successfully");

      fetchAllCategories();
      setInvestmentTypesModified(true)

    }


  return (

<motion.div

    initial={{opacity:0,x:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,x:0}}
    viewport={{once:true}} 

      tabIndex={0}
      className={`${isHovered ? 'bg-purple-400' : 'bg-blue-300'} w-64 transition-all duration-600 ease-in-out mt-3 text-primary-content focus:bg-secondary focus:text-secondary-content border rounded-xl`}
      onMouseEnter={() => setIsHovered(true)} // Show content on hover
      onMouseLeave={() => setIsHovered(false)} // Hide content on mouse leave
    >
      <div className="flex flex-row justify-between">

      <div className={`collapse-title ${isHovered ? 'text-black':'text-white'} text-md`}>Types of Investments</div>
  
      <div ><button onClick={()=>setNewCategoryVisible(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" className="hover:scale-110 transition-transform duration-100" viewBox="0 0 512 512" width="24" height="24" fill="#c934eb">
      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
      </svg> 
      </button></div>

      </div> 

      {newCategoryVisible && <form className="flex flex-row" onSubmit={(e)=>changeHandler(e)}>
      <label className="input input-bordered flex items-center w-40 mx-3 mb-3">
        <input type="text" className="grow" placeholder="New Category" onChange={(e)=>setNewCategory(e.target.value)}/> </label>
        <button type="submit" className="btn btn-accent w-10 border rounded-2xl px-3">Add</button>
      
      </form>}





      <div className={`collapse-content ${
          isHovered ? 'opacity-100 block' : 'max-h-0 opacity-0 hidden'
        } `}>
        {categoryTypes.map((category,index)=>( 
          <div key={index} className="flex flex-row visible justify-between">
              <p className="text-white mb-2">{`${index+1}) ${category.category}`}</p>
          
              <button onClick={()=>deleteHandler(category.id_investCat)}>
                <div className="mb-1"> <svg className="hover:scale-110 transition-transform duration-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="21" height="21" fill="#eb4b4b">
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg></div>
              </button>  
            </div> 
        ))}
       
        <div className="mb-3"/>
      </div>
</motion.div>




  )
}

export default CollapseForInvestTypes