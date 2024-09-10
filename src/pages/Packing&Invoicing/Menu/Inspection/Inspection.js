import React from "react";
import "./Inspection.css";

export default function Inspection() {
  return (
    <div>
      <nav class="navbar navbar-expand-md">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Inspection
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li class="dropdown-submenu">
                  <a class="dropdown-item dropdown-toggle">Profile</a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        Schedule List
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Find Schedule
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="dropdown-submenu">
                  <a
                    class="dropdown-item dropdown-toggle"
                    href="http://google.com"
                  >
                    Service
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        Schedule List
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Find Schedule
                      </a>
                    </li>
                  </ul>
                </li>

                <li class="dropdown-submenu">
                  <a
                    class="dropdown-item dropdown-toggle"
                    href="http://google.com"
                  >
                    Fabrication
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        Schedule List
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Find Schedule
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
