import React from 'react';
import '../Inspection/Inspection.css'

export default function PackingNote() {
  
  return (
    <div>
        <nav class="navbar navbar-expand-md">
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a   id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           PackingNote
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Fabrication</a>
            </li>

            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Services</a>
            </li>

            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Profile</a>
            </li>

            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Misc</a>
            </li>

          </ul>
        </li>
      </ul>
    </div>
  </nav>
  </div>
  )
}
