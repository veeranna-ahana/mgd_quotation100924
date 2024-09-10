import React from 'react';
import '../Inspection/Inspection.css'

export default function Invoice() {
  return (
    <div>
        <nav class="navbar navbar-expand-md">
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a   id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Invoice
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Misc Invoice</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Create New</a></li>
                <li><a class="dropdown-item" href="#">Invoice List</a></li>
                <li><a class="dropdown-item" href="#">PN List</a></li>
              </ul>
            </li>

            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Material Scrap  Invoice</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Scrap </a></li>
                <li><a class="dropdown-item" href="#">Material Return</a></li>
                <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">PN List</a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Scrap</a></li>
                <li><a class="dropdown-item" href="#">Material</a></li>
                </ul>
                </li>
                <li><a class="dropdown-item" href="#">Invoice List </a></li>
                <li><a class="dropdown-item" href="#">create New</a></li>
              </ul>
            </li>

            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Services Invoice</a>
            </li>

            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Sales Invoice</a>
            </li>

            <li class="dropdown-submenu"><a class="dropdown-item dropdown-toggle">Fabrication Invoice</a>
            </li>

          </ul>
        </li>
      </ul>
    </div>
  </nav>
  </div>
  )
}
