import React from 'react';
import '../Inspection/Inspection.css'

export default function ReturnableDC() {
    
    
  return (
    <div>
        <nav class="navbar navbar-expand-md">
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a   id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ReturnableDC
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">DC List </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Created</a></li>
                <li><a class="dropdown-item" href="#">Despatched</a></li>
                <li><a class="dropdown-item" href="#">Closed</a></li>
                <li><a class="dropdown-item" href="#">All</a></li>
              </ul>
            </li>

            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Create New</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
  </div>
  )
}
