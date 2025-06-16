import React, { useEffect, useState } from "react";
import "../../styles/todolist.css"
import { TodoList } from "./TodoList";

//create your first component
const Home = () => {



    return (
        
		<div>
			<h1>My To Do List</h1>
				<div>
					<TodoList/>
				</div>
		</div>
		
	);
};

export default Home;