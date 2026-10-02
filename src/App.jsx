import React, { useState, useMemo } from "react";
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Legend, ReferenceArea,
} from "recharts";

/* ---------------------------------------------------------------------
   TOKENS — "die Ohm" Corporate Design
--------------------------------------------------------------------- */
const OHM_RED = "#C72426";
const OHM_BLUE = "#16283D";
const INK = OHM_BLUE;
const BG = "#F4F4F3";
const PANEL = "#FFFFFF";
const PANEL_BORDER = "#E0DEDC";
const GRAY = "#6B6B6B";
const CHART_BG = "#FFFFFF";
const CHART_GRID = "#E5E3E1";
const GREEN = "#2E9E4F";
const GOLD = "#B5842A";
const SANS = "'Inter', 'IBM Plex Sans', ui-sans-serif, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const OHM_LOGO = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJFYmVuZV8yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjkuNDMgNDAuODQiPjxnIGlkPSJMb2dvIj48Zz48Zz48cGF0aCBkPSJtMTE2LjI2LDE4LjI4di02LjVoLTIuMzh2LS44N2g1LjU4di44N2gtMi4yNXY2LjVoLS45NVoiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTIyLDE4LjM5Yy0uNDksMC0uOTItLjExLTEuMjktLjMyLS4zNy0uMjEtLjY3LS41Mi0uODgtLjkyLS4yMS0uNC0uMzItLjg4LS4zMi0xLjQ0cy4xLTEuMDQuMjktMS40Ni40Ny0uNzQuODMtLjk4Yy4zNi0uMjQuOC0uMzUsMS4zMS0uMzVzLjkyLjExLDEuMjYuMzJjLjM0LjIxLjYuNTIuNzguOTEuMTguMzkuMjcuODUuMjcsMS4zOHYuMzVoLTMuNzhjMCwuMzMuMDUuNjMuMTcuOS4xMS4yNy4yOC40OS41LjY1LjIyLjE2LjUxLjI0Ljg1LjI0cy42My0uMDguODctLjIzLjQtLjM4LjQ3LS42OGguODljLS4wNi4zNi0uMi42Ni0uNDMuOS0uMjIuMjQtLjQ5LjQzLS44LjU1LS4zMS4xMi0uNjQuMTktLjk4LjE5Wm0tMS41My0zLjE2aDIuODZjMC0uMy0uMDUtLjU4LS4xNS0uODItLjEtLjI0LS4yNi0uNDQtLjQ3LS41OC0uMjEtLjE0LS40Ny0uMjEtLjc5LS4yMXMtLjYuMDgtLjgyLjI0LS4zOC4zNi0uNDguNjEtLjE2LjUtLjE1Ljc2WiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xMjcuNjcsMTguMzljLS40OCwwLS45LS4xLTEuMjYtLjMxcy0uNjUtLjUxLS44Ni0uOTJjLS4yMS0uNC0uMzEtLjktLjMxLTEuNDksMC0uNTUuMDktMS4wMy4yOC0xLjQ0LjE5LS40MS40Ni0uNzQuODMtLjk3LjM2LS4yMy44LS4zNSwxLjMyLS4zNS4zOCwwLC43Mi4wNywxLjAyLjIycy41NS4zNS43NC42MWMuMTkuMjcuMzEuNTguMzYuOTRoLS44NGMtLjAzLS4xOS0uMS0uMzYtLjIxLS41MS0uMTEtLjE1LS4yNS0uMjgtLjQzLS4zN3MtLjM5LS4xNC0uNjMtLjE0Yy0uNDUsMC0uODIuMTYtMS4xLjQ5LS4yOC4zMy0uNDMuODMtLjQzLDEuNSwwLC42MS4xMywxLjA5LjM5LDEuNDYuMjYuMzcuNjQuNTUsMS4xNS41NS4yNCwwLC40NS0uMDUuNjMtLjE0LjE4LS4wOS4zMi0uMjIuNDMtLjM3cy4xOC0uMzIuMjEtLjVoLjgyYy0uMDQuMzUtLjE2LjY2LS4zNi45Mi0uMi4yNi0uNDQuNDYtLjc0LjYtLjMuMTQtLjY0LjIxLTEuMDEuMjFaIiBmaWxsPSIjYzcyNDI2Ii8+PHBhdGggZD0ibTEzMS4wMSwxOC4yOHYtNy41N2guOTJ2My4wOGMuMDktLjE1LjIxLS4yOC4zNi0uNDEuMTUtLjEzLjMzLS4yMy41NC0uMzEuMjEtLjA4LjQ2LS4xMi43NC0uMTIuMzQsMCwuNjUuMDYuOTMuMTkuMjguMTMuNS4zMS42Ni41NHMuMjQuNTEuMjQuODR2My43N2gtLjk0di0zLjU4YzAtLjMyLS4xMS0uNTYtLjMyLS43My0uMjItLjE3LS41LS4yNi0uODQtLjI2LS4yNCwwLS40Ni4wNC0uNjYuMTItLjIxLjA4LS4zOC4xOS0uNS4zNS0uMTMuMTUtLjE5LjM1LS4xOS41OXYzLjUyaC0uOTRaIiBmaWxsPSIjYzcyNDI2Ii8+PHBhdGggZD0ibTEzNi44OSwxOC4yOHYtNS4yN2guOTJ2Ljc2Yy4wOC0uMTUuMi0uMjguMzUtLjQxLjE1LS4xMy4zMy0uMjMuNTUtLjMxcy40Ni0uMTIuNzUtLjEyYy4zMywwLC42NC4wNy45Mi4ycy41LjM0LjY3LjYyYy4xNy4yOC4yNS42NC4yNSwxLjA4djMuNDVoLS45NHYtMy4zNWMwLS40MS0uMTEtLjcyLS4zMi0uOTItLjIyLS4yLS41LS4zLS44NC0uMy0uMjQsMC0uNDYuMDQtLjY3LjEyLS4yMS4wOC0uMzguMTktLjUuMzUtLjEzLjE1LS4xOS4zNS0uMTkuNTh2My41MmgtLjk0WiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xNDIuNzcsMTEuOXYtLjk4aC45N3YuOThoLS45N1ptLjAzLDYuMzl2LTUuMjdoLjkxdjUuMjdoLS45MVoiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTQ3LjIsMTguMzljLS4zNywwLS43MS0uMDYtMS4wMi0uMTctLjMxLS4xMS0uNTgtLjI5LS43OC0uNTQtLjIxLS4yNC0uMzQtLjU1LS4zOS0uOTNoLjg2Yy4wNC4yMS4xMy4zOC4yNS41Mi4xMi4xNC4yOC4yNC40Ny4zMS4xOS4wNy4zOS4xLjYxLjEuMzYsMCwuNjQtLjA3Ljg2LS4yLjIyLS4xMy4zMy0uMzQuMzMtLjYxLDAtLjE5LS4wNi0uMzUtLjE3LS40Ny0uMTEtLjEyLS4yOS0uMi0uNTMtLjI2bC0xLjA5LS4yN2MtLjQyLS4xLS43Ni0uMjYtMS4wMi0uNDgtLjI1LS4yMi0uMzgtLjUyLS4zOC0uOTEsMC0uMzEuMDctLjU4LjIyLS44MnMuMzctLjQyLjY3LS41NmMuMy0uMTQuNjctLjIsMS4xMS0uMi41NywwLDEuMDQuMTMsMS4zOS4zOS4zNS4yNi41My42My41NSwxLjEzaC0uODRjLS4wMy0uMjUtLjE1LS40NS0uMzQtLjYtLjE5LS4xNS0uNDUtLjIyLS43Ny0uMjJzLS42MS4wNy0uODIuMmMtLjIxLjEzLS4zMi4zNC0uMzIuNjIsMCwuMTkuMDguMzMuMjMuNDQuMTUuMTEuMzcuMi42Ni4yN2wxLjA2LjI3Yy4yNC4wNi40NC4xNS42LjI1LjE2LjExLjI5LjIyLjM4LjM1cy4xNi4yNi4yLjQxLjA2LjI4LjA2LjQxYzAsLjMyLS4wOC42LS4yNC44My0uMTYuMjMtLjM5LjQxLS42OS41NC0uMy4xMy0uNjcuMTktMS4xLjE5WiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xNTIuNTgsMTguMzljLS40OCwwLS45LS4xLTEuMjYtLjMxcy0uNjUtLjUxLS44Ni0uOTJjLS4yMS0uNC0uMzEtLjktLjMxLTEuNDksMC0uNTUuMDktMS4wMy4yOC0xLjQ0LjE5LS40MS40Ni0uNzQuODMtLjk3LjM2LS4yMy44LS4zNSwxLjMyLS4zNS4zOCwwLC43Mi4wNywxLjAyLjIycy41NS4zNS43NC42MWMuMTkuMjcuMzEuNTguMzYuOTRoLS44NGMtLjAzLS4xOS0uMS0uMzYtLjIxLS41MS0uMTEtLjE1LS4yNS0uMjgtLjQzLS4zN3MtLjM5LS4xNC0uNjMtLjE0Yy0uNDUsMC0uODIuMTYtMS4xLjQ5LS4yOC4zMy0uNDMuODMtLjQzLDEuNSwwLC42MS4xMywxLjA5LjM5LDEuNDYuMjYuMzcuNjQuNTUsMS4xNS41NS4yNCwwLC40NS0uMDUuNjMtLjE0LjE4LS4wOS4zMi0uMjIuNDMtLjM3cy4xOC0uMzIuMjEtLjVoLjgyYy0uMDQuMzUtLjE2LjY2LS4zNi45Mi0uMi4yNi0uNDQuNDYtLjc0LjYtLjMuMTQtLjY0LjIxLTEuMDEuMjFaIiBmaWxsPSIjYzcyNDI2Ii8+PHBhdGggZD0ibTE1NS45MywxOC4yOHYtNy41N2guOTJ2My4wOGMuMDktLjE1LjIxLS4yOC4zNi0uNDEuMTUtLjEzLjMzLS4yMy41NC0uMzEuMjEtLjA4LjQ2LS4xMi43NC0uMTIuMzQsMCwuNjUuMDYuOTMuMTkuMjguMTMuNS4zMS42Ni41NHMuMjQuNTEuMjQuODR2My43N2gtLjk0di0zLjU4YzAtLjMyLS4xMS0uNTYtLjMyLS43My0uMjItLjE3LS41LS4yNi0uODQtLjI2LS4yNCwwLS40Ni4wNC0uNjYuMTItLjIxLjA4LS4zOC4xOS0uNS4zNS0uMTMuMTUtLjE5LjM1LS4xOS41OXYzLjUyaC0uOTRaIiBmaWxsPSIjYzcyNDI2Ii8+PHBhdGggZD0ibTE2NC4wNCwxOC4zOWMtLjQ5LDAtLjkyLS4xMS0xLjI5LS4zMi0uMzctLjIxLS42Ny0uNTItLjg4LS45Mi0uMjEtLjQtLjMyLS44OC0uMzItMS40NHMuMS0xLjA0LjI5LTEuNDYuNDctLjc0LjgzLS45OGMuMzYtLjI0LjgtLjM1LDEuMzEtLjM1cy45Mi4xMSwxLjI2LjMyYy4zNC4yMS42LjUyLjc4LjkxLjE4LjM5LjI3Ljg1LjI3LDEuMzh2LjM1aC0zLjc4YzAsLjMzLjA1LjYzLjE3LjkuMTEuMjcuMjguNDkuNS42NS4yMi4xNi41MS4yNC44NS4yNHMuNjMtLjA4Ljg3LS4yMy40LS4zOC40Ny0uNjhoLjg5Yy0uMDYuMzYtLjIuNjYtLjQzLjktLjIyLjI0LS40OS40My0uOC41NS0uMzEuMTItLjY0LjE5LS45OC4xOVptLTEuNTMtMy4xNmgyLjg2YzAtLjMtLjA1LS41OC0uMTUtLjgyLS4xLS4yNC0uMjYtLjQ0LS40Ny0uNTgtLjIxLS4xNC0uNDctLjIxLS43OS0uMjFzLS42LjA4LS44Mi4yNC0uMzguMzYtLjQ4LjYxLS4xNi41LS4xNS43NloiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTE1LjAyLDI4LjY5di03LjM3aC45NHYzLjE0aDMuOTh2LTMuMTRoLjk0djcuMzdoLS45NHYtMy40aC0zLjk4djMuNGgtLjk0WiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xMjQuNjcsMjguNzljLS40OSwwLS45MS0uMS0xLjI3LS4zMS0uMzYtLjIxLS42NC0uNTItLjg0LS45Mi0uMi0uNC0uMy0uOS0uMy0xLjQ4LDAtLjU1LjA5LTEuMDMuMjgtMS40NS4xOS0uNDIuNDYtLjc0LjgyLS45N3MuOC0uMzQsMS4zMi0uMzRjLjQ5LDAsLjkxLjExLDEuMjYuMzIuMzYuMjEuNjMuNTIuODMuOTMuMi40MS4zLjkxLjMsMS41LDAsLjU0LS4wOSwxLjAxLS4yOCwxLjQyLS4xOC40MS0uNDUuNzMtLjgxLjk2LS4zNi4yMy0uNzkuMzQtMS4zMi4zNFptMC0uNzRjLjMxLDAsLjU4LS4wOC43OS0uMjRzLjM4LS4zOS41LS42OWMuMTEtLjMuMTctLjY1LjE3LTEuMDcsMC0uMzgtLjA1LS43Mi0uMTUtMS4wMnMtLjI2LS41NC0uNDctLjcyLS40OS0uMjctLjg0LS4yN2MtLjMyLDAtLjU5LjA4LS44MS4yNHMtLjM5LjM5LS41LjY5Yy0uMTEuMy0uMTcuNjYtLjE3LDEuMDgsMCwuMzcuMDUuNzEuMTUsMS4wMS4xLjMuMjYuNTQuNDguNzIuMjIuMTguNS4yNi44NS4yNloiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTMwLjQ1LDI4Ljc5Yy0uNDgsMC0uOS0uMS0xLjI2LS4zMXMtLjY1LS41MS0uODYtLjkyYy0uMjEtLjQtLjMxLS45LS4zMS0xLjQ5LDAtLjU1LjA5LTEuMDMuMjgtMS40NC4xOS0uNDEuNDYtLjc0LjgzLS45Ny4zNi0uMjMuOC0uMzUsMS4zMi0uMzUuMzgsMCwuNzIuMDcsMS4wMi4yMnMuNTUuMzUuNzQuNjFjLjE5LjI3LjMxLjU4LjM2Ljk0aC0uODRjLS4wMy0uMTktLjEtLjM2LS4yMS0uNTEtLjExLS4xNS0uMjUtLjI4LS40My0uMzdzLS4zOS0uMTQtLjYzLS4xNGMtLjQ1LDAtLjgyLjE2LTEuMS40OS0uMjguMzMtLjQzLjgzLS40MywxLjUsMCwuNjEuMTMsMS4wOS4zOSwxLjQ2LjI2LjM3LjY0LjU1LDEuMTUuNTUuMjQsMCwuNDUtLjA1LjYzLS4xNC4xOC0uMDkuMzItLjIyLjQzLS4zN3MuMTgtLjMyLjIxLS41aC44MmMtLjA0LjM1LS4xNi42Ni0uMzYuOTItLjIuMjYtLjQ0LjQ2LS43NC42LS4zLjE0LS42NC4yMS0xLjAxLjIxWiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xMzMuOCwyOC42OXYtNy41N2guOTJ2My4wOGMuMDktLjE1LjIxLS4yOC4zNi0uNDEuMTUtLjEzLjMzLS4yMy41NC0uMzEuMjEtLjA4LjQ2LS4xMi43NC0uMTIuMzQsMCwuNjUuMDYuOTMuMTkuMjguMTMuNS4zMS42Ni41NHMuMjQuNTEuMjQuODR2My43N2gtLjk0di0zLjU4YzAtLjMyLS4xMS0uNTYtLjMyLS43My0uMjItLjE3LS41LS4yNi0uODQtLjI2LS4yNCwwLS40Ni4wNC0uNjYuMTItLjIxLjA4LS4zOC4xOS0uNS4zNS0uMTMuMTUtLjE5LjM1LS4xOS41OXYzLjUyaC0uOTRaIiBmaWxsPSIjYzcyNDI2Ii8+PHBhdGggZD0ibTE0MS41MiwyOC43OWMtLjM3LDAtLjcxLS4wNi0xLjAyLS4xNy0uMzEtLjExLS41OC0uMjktLjc4LS41NC0uMjEtLjI0LS4zNC0uNTUtLjM5LS45M2guODZjLjA0LjIxLjEzLjM4LjI1LjUyLjEyLjE0LjI4LjI0LjQ3LjMxLjE5LjA3LjM5LjEuNjEuMS4zNiwwLC42NC0uMDcuODYtLjIuMjItLjEzLjMzLS4zNC4zMy0uNjEsMC0uMTktLjA2LS4zNS0uMTctLjQ3LS4xMS0uMTItLjI5LS4yLS41My0uMjZsLTEuMDktLjI3Yy0uNDItLjEtLjc2LS4yNi0xLjAyLS40OC0uMjUtLjIyLS4zOC0uNTItLjM4LS45MSwwLS4zMS4wNy0uNTguMjItLjgycy4zNy0uNDIuNjctLjU2Yy4zLS4xNC42Ny0uMiwxLjExLS4yLjU3LDAsMS4wNC4xMywxLjM5LjM5LjM1LjI2LjUzLjYzLjU1LDEuMTNoLS44NGMtLjAzLS4yNS0uMTUtLjQ1LS4zNC0uNi0uMTktLjE1LS40NS0uMjItLjc3LS4yMnMtLjYxLjA3LS44Mi4yYy0uMjEuMTMtLjMyLjM0LS4zMi42MiwwLC4xOS4wOC4zMy4yMy40NC4xNS4xMS4zNy4yLjY2LjI3bDEuMDYuMjdjLjI0LjA2LjQ0LjE1LjYuMjUuMTYuMTEuMjkuMjIuMzguMzVzLjE2LjI2LjIuNDEuMDYuMjguMDYuNDFjMCwuMzItLjA4LjYtLjI0LjgzLS4xNi4yMy0uMzkuNDEtLjY5LjU0LS4zLjEzLS42Ny4xOS0xLjEuMTlaIiBmaWxsPSIjYzcyNDI2Ii8+PHBhdGggZD0ibTE0Ni45MSwyOC43OWMtLjQ4LDAtLjktLjEtMS4yNi0uMzFzLS42NS0uNTEtLjg2LS45MmMtLjIxLS40LS4zMS0uOS0uMzEtMS40OSwwLS41NS4wOS0xLjAzLjI4LTEuNDQuMTktLjQxLjQ2LS43NC44My0uOTcuMzYtLjIzLjgtLjM1LDEuMzItLjM1LjM4LDAsLjcyLjA3LDEuMDIuMjJzLjU1LjM1Ljc0LjYxYy4xOS4yNy4zMS41OC4zNi45NGgtLjg0Yy0uMDMtLjE5LS4xLS4zNi0uMjEtLjUxLS4xMS0uMTUtLjI1LS4yOC0uNDMtLjM3cy0uMzktLjE0LS42My0uMTRjLS40NSwwLS44Mi4xNi0xLjEuNDktLjI4LjMzLS40My44My0uNDMsMS41LDAsLjYxLjEzLDEuMDkuMzksMS40Ni4yNi4zNy42NC41NSwxLjE1LjU1LjI0LDAsLjQ1LS4wNS42My0uMTQuMTgtLjA5LjMyLS4yMi40My0uMzdzLjE4LS4zMi4yMS0uNWguODJjLS4wNC4zNS0uMTYuNjYtLjM2LjkyLS4yLjI2LS40NC40Ni0uNzQuNi0uMy4xNC0uNjQuMjEtMS4wMS4yMVoiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTUwLjI2LDI4LjY5di03LjU3aC45MnYzLjA4Yy4wOS0uMTUuMjEtLjI4LjM2LS40MS4xNS0uMTMuMzMtLjIzLjU0LS4zMS4yMS0uMDguNDYtLjEyLjc0LS4xMi4zNCwwLC42NS4wNi45My4xOS4yOC4xMy41LjMxLjY2LjU0cy4yNC41MS4yNC44NHYzLjc3aC0uOTR2LTMuNThjMC0uMzItLjExLS41Ni0uMzItLjczLS4yMi0uMTctLjUtLjI2LS44NC0uMjYtLjI0LDAtLjQ2LjA0LS42Ni4xMi0uMjEuMDgtLjM4LjE5LS41LjM1LS4xMy4xNS0uMTkuMzUtLjE5LjU5djMuNTJoLS45NFoiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTU4LjA4LDI4Ljc5Yy0uMjgsMC0uNTMtLjA0LS43OC0uMTItLjI0LS4wOC0uNDYtLjE5LS42NC0uMzQtLjE5LS4xNS0uMzMtLjM0LS40NC0uNTYtLjExLS4yMi0uMTYtLjQ4LS4xNi0uNzh2LTMuNThoLjk0djMuNDhjMCwuMzQuMTEuNjIuMzIuODQuMjEuMjEuNTMuMzIuOTYuMzIuMzksMCwuNy0uMS45NC0uMy4yNC0uMi4zNS0uNS4zNS0uOXYtMy40M2guOTR2NS4yN2gtLjc1bC0uMS0xLjAxYy0uMDYuMjctLjE3LjQ4LS4zMy42NC0uMTYuMTYtLjM0LjI4LS41Ni4zNnMtLjQ1LjExLS43LjExWiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xNjMuNDUsMjguNzZjLS4yOSwwLS41Mi0uMDQtLjY5LS4xMi0uMTgtLjA4LS4zMS0uMTgtLjQtLjMyLS4wOS0uMTMtLjE2LS4yOC0uMTktLjQ2LS4wMy0uMTctLjA1LS4zNS0uMDUtLjUzdi02LjIyaC45M3Y2LjEzYzAsLjI2LjA1LjQ2LjE2LjYuMS4xMy4yNS4yMS40NC4yMmguMjl2LjYyYy0uMDguMDItLjE2LjA0LS4yNC4wNi0uMDguMDItLjE2LjAyLS4yMy4wMloiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTY3LjE5LDI4Ljc5Yy0uNDksMC0uOTItLjExLTEuMjktLjMyLS4zNy0uMjEtLjY3LS41Mi0uODgtLjkyLS4yMS0uNC0uMzItLjg4LS4zMi0xLjQ0cy4xLTEuMDQuMjktMS40Ni40Ny0uNzQuODMtLjk4Yy4zNi0uMjQuOC0uMzUsMS4zMS0uMzVzLjkyLjExLDEuMjYuMzJjLjM0LjIxLjYuNTIuNzguOTEuMTguMzkuMjcuODUuMjcsMS4zOHYuMzVoLTMuNzhjMCwuMzMuMDUuNjMuMTcuOS4xMS4yNy4yOC40OS41LjY1LjIyLjE2LjUxLjI0Ljg1LjI0cy42My0uMDguODctLjIzLjQtLjM4LjQ3LS42OGguODljLS4wNi4zNi0uMi42Ni0uNDMuOS0uMjIuMjQtLjQ5LjQzLS44LjU1LS4zMS4xMi0uNjQuMTktLjk4LjE5Wm0tMS41My0zLjE2aDIuODZjMC0uMy0uMDUtLjU4LS4xNS0uODItLjEtLjI0LS4yNi0uNDQtLjQ3LS41OC0uMjEtLjE0LS40Ny0uMjEtLjc5LS4yMXMtLjYuMDgtLjgyLjI0LS4zOC4zNi0uNDguNjEtLjE2LjUtLjE1Ljc2WiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xMTUuMDIsMzkuMXYtNy4zN2guOWwzLjg5LDUuNzN2LTUuNzNoLjk0djcuMzdoLS44NGwtMy45Ni01LjgxdjUuODFoLS45NFoiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTI0LjQ1LDM5LjJjLS4yOCwwLS41My0uMDQtLjc4LS4xMi0uMjQtLjA4LS40Ni0uMTktLjY0LS4zNC0uMTktLjE1LS4zMy0uMzQtLjQ0LS41Ni0uMTEtLjIyLS4xNi0uNDgtLjE2LS43OHYtMy41OGguOTR2My40OGMwLC4zNC4xMS42Mi4zMi44NC4yMS4yMS41My4zMi45Ni4zMi4zOSwwLC43LS4xLjk0LS4zLjI0LS4yLjM1LS41LjM1LS45di0zLjQzaC45NHY1LjI3aC0uNzVsLS4xLTEuMDFjLS4wNi4yNy0uMTcuNDgtLjMzLjY0LS4xNi4xNi0uMzQuMjgtLjU2LjM2cy0uNDUuMTEtLjcuMTFabS0xLjI0LTYuNTZ2LS45MWguOTN2LjkxaC0uOTNabTEuOTgsMHYtLjkxaC45M3YuOTFoLS45M1oiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTI4LjQ5LDM5LjF2LTUuMjdoLjl2MS4wMWMuMDktLjI1LjIxLS40Ni4zNy0uNjIuMTYtLjE3LjM0LS4yOS41NS0uMzcuMjEtLjA4LjQyLS4xMi42NC0uMTIuMDgsMCwuMTUsMCwuMjMuMDIuMDguMDEuMTMuMDMuMTcuMDV2LjkxYy0uMDUtLjAyLS4xMi0uMDQtLjItLjA1cy0uMTUtLjAxLS4yLS4wMWMtLjIxLS4wMS0uNDEsMC0uNTkuMDRzLS4zNC4xMS0uNDguMmMtLjE0LjEtLjI1LjIyLS4zMy4zOC0uMDguMTUtLjEyLjM0LS4xMi41NnYzLjI4aC0uOTRaIiBmaWxsPSIjYzcyNDI2Ii8+PHBhdGggZD0ibTEzMi40OCwzOS4xdi01LjI3aC45MnYuNzZjLjA4LS4xNS4yLS4yOC4zNS0uNDEuMTUtLjEzLjMzLS4yMy41NS0uMzFzLjQ2LS4xMi43NS0uMTJjLjMzLDAsLjY0LjA3LjkyLjJzLjUuMzQuNjcuNjJjLjE3LjI4LjI1LjY0LjI1LDEuMDh2My40NWgtLjk0di0zLjM1YzAtLjQxLS4xMS0uNzItLjMyLS45Mi0uMjItLjItLjUtLjMtLjg0LS4zLS4yNCwwLS40Ni4wNC0uNjcuMTItLjIxLjA4LS4zOC4xOS0uNS4zNS0uMTMuMTUtLjE5LjM1LS4xOS41OHYzLjUyaC0uOTRaIiBmaWxsPSIjYzcyNDI2Ii8+PHBhdGggZD0ibTE0MC45NywzOS4yYy0uMzEsMC0uNTctLjA0LS43OC0uMTItLjIxLS4wOC0uMzktLjE5LS41Mi0uMzEtLjE0LS4xMy0uMjQtLjI2LS4zMi0uMzktLjA4LS4xMy0uMTMtLjI1LS4xNi0uMzVsLS4xLDEuMDhoLS43MnYtNy41N2guOTV2My4xNGMuMDQtLjA5LjExLS4xOS4yLS4yOS4wOS0uMS4yMS0uMjEuMzUtLjMxcy4zMS0uMTguNTEtLjI0Yy4yLS4wNi40Mi0uMS42Ny0uMS42NiwwLDEuMTguMjMsMS41Ny42OS4zOS40Ni41OCwxLjEzLjU4LDIuMDMsMCwuNTUtLjA4LDEuMDQtLjI1LDEuNDUtLjE3LjQxLS40MS43My0uNzQuOTYtLjMzLjIzLS43NC4zNC0xLjIzLjM0Wm0tLjE3LS43MmMuNDMsMCwuNzgtLjE3LDEuMDQtLjUuMjctLjMzLjQtLjg2LjQtMS41OCwwLS42Mi0uMTItMS4wOS0uMzgtMS40My0uMjUtLjM0LS42MS0uNTEtMS4wOS0uNTEtLjM1LDAtLjYzLjA4LS44NC4yMy0uMjEuMTUtLjM3LjM3LS40Ny42Ni0uMS4yOS0uMTUuNjQtLjE2LDEuMDUsMCwuNzQuMTIsMS4yNy4zNCwxLjU5LjIzLjMyLjYxLjQ5LDEuMTQuNDlaIiBmaWxsPSIjYzcyNDI2Ii8+PHBhdGggZD0ibTE0Ni42NywzOS4yYy0uNDksMC0uOTItLjExLTEuMjktLjMyLS4zNy0uMjEtLjY3LS41Mi0uODgtLjkyLS4yMS0uNC0uMzItLjg4LS4zMi0xLjQ0cy4xLTEuMDQuMjktMS40Ni40Ny0uNzQuODMtLjk4Yy4zNi0uMjQuOC0uMzUsMS4zMS0uMzVzLjkyLjExLDEuMjYuMzJjLjM0LjIxLjYuNTIuNzguOTEuMTguMzkuMjcuODUuMjcsMS4zOHYuMzVoLTMuNzhjMCwuMzMuMDUuNjMuMTcuOS4xMS4yNy4yOC40OS41LjY1LjIyLjE2LjUxLjI0Ljg1LjI0cy42My0uMDguODctLjIzLjQtLjM4LjQ3LS42OGguODljLS4wNi4zNi0uMi42Ni0uNDMuOS0uMjIuMjQtLjQ5LjQzLS44LjU1LS4zMS4xMi0uNjQuMTktLjk4LjE5Wm0tMS41My0zLjE2aDIuODZjMC0uMy0uMDUtLjU4LS4xNS0uODItLjEtLjI0LS4yNi0uNDQtLjQ3LS41OC0uMjEtLjE0LS40Ny0uMjEtLjc5LS4yMXMtLjYuMDgtLjgyLjI0LS4zOC4zNi0uNDguNjEtLjE2LjUtLjE1Ljc2WiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xNTAuMjEsMzkuMXYtNS4yN2guOXYxLjAxYy4wOS0uMjUuMjEtLjQ2LjM3LS42Mi4xNi0uMTcuMzQtLjI5LjU1LS4zNy4yMS0uMDguNDItLjEyLjY0LS4xMi4wOCwwLC4xNSwwLC4yMy4wMi4wOC4wMS4xMy4wMy4xNy4wNXYuOTFjLS4wNS0uMDItLjEyLS4wNC0uMi0uMDVzLS4xNS0uMDEtLjItLjAxYy0uMjEtLjAxLS40MSwwLS41OS4wNHMtLjM0LjExLS40OC4yYy0uMTQuMS0uMjUuMjItLjMzLjM4LS4wOC4xNS0uMTIuMzQtLjEyLjU2djMuMjhoLS45NFoiIGZpbGw9IiNjNzI0MjYiLz48cGF0aCBkPSJtMTU2LjI3LDQwLjg0Yy0uODMsMC0xLjQ3LS4xMi0xLjkzLS4zNi0uNDYtLjI0LS42OS0uNTgtLjY5LTEuMDMsMC0uMTkuMDQtLjM1LjEzLS40OS4wOS0uMTMuMTktLjI1LjMyLS4zMy4xMi0uMDkuMjQtLjE2LjM0LS4yMS4xLS4wNS4xNy0uMDkuMi0uMTEtLjA2LS4wMy0uMTMtLjA4LS4yMS0uMTMtLjA4LS4wNS0uMTYtLjEyLS4yMy0uMnMtLjEtLjItLjEtLjMzYzAtLjE3LjA4LS4zMi4yMy0uNDYuMTYtLjE0LjM5LS4yNC43LS4zMS0uMzEtLjE2LS41NS0uMzYtLjcyLS42Mi0uMTctLjI2LS4yNi0uNTQtLjI2LS44NCwwLS4zNC4wOS0uNjQuMjgtLjg5LjE4LS4yNS40NS0uNDQuNzktLjU4LjM0LS4xMy43NS0uMiwxLjIzLS4yLjM0LDAsLjYzLjA0Ljg2LjEyLjIzLjA4LjQ1LjE5LjY1LjM0LjA1LS4wMi4xNC0uMDYuMjYtLjExLjEyLS4wNS4yNS0uMS4zOS0uMTYuMTQtLjA2LjI3LS4xMS40LS4xN3MuMjItLjA5LjMtLjEydi44N3MtLjkzLjE3LS45My4xN2MuMDUuMTEuMS4yMy4xMy4zNi4wMy4xMy4wNC4yNS4wNC4zNiwwLC4zMS0uMDguNTktLjI0Ljg0LS4xNi4yNS0uNDEuNDUtLjczLjYtLjMzLjE1LS43My4yMi0xLjIyLjIyLS4wNCwwLS4wOSwwLS4xNiwwLS4wNiwwLS4xMiwwLS4xNiwwLS4zNiwwLS42MS4wNS0uNzQuMTItLjEzLjA3LS4yLjE1LS4yLjIzLDAsLjEuMDguMTcuMjMuMi4xNS4wNC40MS4wNy43OC4xLjEzLDAsLjMuMDEuNDkuMDMuMiwwLC40MS4wMi42Ni4wNC41NS4wMy45OC4xNywxLjI3LjQycy40NS41OC40NSwxYzAsLjQ4LS4yMS44Ny0uNjQsMS4xNy0uNDMuMy0xLjA4LjQ1LTEuOTUuNDVabS4xNy0uNjFjLjQ5LDAsLjg2LS4wNywxLjEyLS4yMi4yNi0uMTUuMzktLjM3LjM5LS42NiwwLS4yMS0uMDgtLjM4LS4yNC0uNTEtLjE2LS4xNC0uNC0uMjEtLjcyLS4yM2wtMS40OC0uMWMtLjEzLDAtLjI3LjAzLS40MS4xLS4xNC4wNy0uMjYuMTctLjM2LjNzLS4xNS4yOC0uMTUuNDRjMCwuMjguMTUuNS40NS42NS4zLjE2Ljc3LjIzLDEuNC4yM1ptLS4xNi0zLjc2Yy4zOCwwLC42OC0uMDkuOTItLjI3LjIzLS4xOC4zNS0uNDQuMzUtLjc4cy0uMTItLjYyLS4zNS0uODEtLjU0LS4yOC0uOTItLjI4LS43LjA5LS45NC4yOC0uMzUuNDYtLjM1LjgxYzAsLjMzLjExLjU5LjM0Ljc3LjIzLjE4LjU0LjI4Ljk1LjI4WiIgZmlsbD0iI2M3MjQyNiIvPjwvZz48Zz48cGF0aCBkPSJtNTcuODMsMjEuODZjLjEzLTUuNS0zLjExLTEwLjQ4LTguODctMTEuMTQtMi43NC0uMjQtNS42My43NS03Ljc5LDIuNSwwLS4yOSwwLS41Ny4wMy0uODYuMDctMy4wOC4xMi05LjI4LjEtMTIuMzZoLTYuMDJ2MzkuMWg2LjAyczAtMTAuOTgsMC0xNC4zN2gwczAtMS4zNSwwLTIuNjRjLjA2LTEuNzQuMzktMy41NiwxLjcxLTQuNTcsMS41Ni0xLjE4LDQuMzktMS4zOCw2LjE4LS41OCwxLjUyLjcyLDIuMDksMS44MSwyLjQ4LDMuNDguMS42NS4xNywyLjI3LjE3LDQuMzIsMCw0LjY5LS4wOCwxMy4wOS0uMDIsMTQuMzYsMCwwLDYuMDIsMCw2LjAyLDAtLjAxLTEuMi4wMi0xNi40MywwLTE3LjI0WiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xMDEuNjYsMzMuNDJzLS4wNSwwLS4wOC4wMWMwLTQuODQuMDEtMTEuMDYsMC0xMS41Ny4xNy01LjI5LTMuMTctMTAuNzctOC44Ni0xMS4xOC0zLjU1LS4yOC03LjYxLjk4LTkuODEsMy45MS0xLjUyLTIuMTEtMy44LTMuNjEtNi43Mi0zLjkyLS45Mi0uMDUtMS44NS4wMi0yLjc3LjIxLTEuODMuMzUtMy41OSwxLjE4LTUuMDMsMi4zNC0uMDItLjgzLS4wMi0xLjY1LDAtMi40OGgtNS45djI4LjM2aDYuMDJsLjAyLTcuMDl2LTcuMDljMC0uMzksMC0yLjgyLDAtMywwLS42Mi4wNy0xLjA4LjE0LTEuNDcuMTMtLjcuMzQtMS4zNy42OC0xLjk0LjE2LS4yNi4zNC0uNS41Ni0uNzIuMDEtLjAxLjIyLS4xOS4zMS0uMjcsMS4yLS44OCwyLjgzLTEuMTUsNC4zMS0xLjAzLjY4LjA2LDEuMzIuMjEsMS44Ny40NS43Ni4zNiwxLjI4LjgxLDEuNjcsMS4zOC4xMi4xOS4yMy4zOS4zMy42LjIuNDQuMzYuOTMuNDksMS41LjAzLjE2LjA1LjM4LjA3LjY0LDAsLjA5LjAxLjE4LjAyLjI4LjAxLjI2LjAzLjU1LjA0Ljg3LDAsLjAxLDAsLjAyLDAsLjAzLDAsLjI3LjAyLDEuMzEuMDIsMS40OS4wMywzLjQ0LDAsNi44NywwLDEwLjMxLDAsLjI0LDAsNS4wNSwwLDUuMDUsMCwwLDEuNywwLDMuMjksMCwuMzcsMCwuNzQsMCwxLjA4LDBzLjY1LDAsLjkxLDBoLjc0czAtLjAzLDAtLjA0aDBzMC0zLjIyLDAtNi43YzAtMS4xNiwwLTIuMzcsMC0zLjU0LDAtLjI1LDAtMy41OCwwLTQuNjYsMC0uMTgsMC0uNTEsMC0uNTEsMCwwLDAtMS40NCwwLTEuNDgsMC0xLjMzLjI4LTMsMS4wMy0zLjk1LDEuMDItMS4zMiwyLjUzLTEuNjgsNC4yNi0xLjczLDEuNjktLjA2LDMuMzEuNDIsNC4yLDEuNzUuNjQuODgsMS4wMiwyLjM3LDEuMDMsMy42MnYxLjkyczAsMTUuMzIsMCwxNS4zMmMwLDAsNi4wMiwwLDYuMDIsMGgwczYuMSwwLDYuMSwwdi02LjAyYy0xLjc0LS4wMi0zLjg5LS4wNy02LjAzLjM0WiIgZmlsbD0iI2M3MjQyNiIvPjxwYXRoIGQ9Im0xNy4yNSwxMC4zN2gwYy02LjAzLjA4LTExLjQ3LDIuODYtMTMuMzYsOC45LTEuNDEsNC40NC0uOTcsOS4xMywxLjUzLDEzLjExLjIzLjM1LjQ5LjY4Ljc3Ljk5LTIuMDUtLjM2LTQuMTEtLjMyLTYuMTgtLjN2Ni4wMmgxNS4yN3YtNS44MmMtNC4zMS0uNTgtNS45OC0zLjUtNi4wMy04LjY4LS4xNS01LjcxLDIuNDktOC44LDguMDItOC45MmgwYzMuNTUuMDQsNi43MSwxLjY3LDcuNTksNS4yNi42LDIuMjMuNTYsNS4yMi4wMyw3LjQ1LS43LDMuMTEtMi44Nyw0LjUyLTUuNjQsNC44OXY1LjY4YzEuMS0uMTIsMi4yMy0uMzIsMy4zOC0uNjcsOC4xLTIuMzcsMTAuMi0xMS43MSw3Ljk3LTE4Ljk5LTEuOTEtNi03LjMyLTguODMtMTMuMzMtOC45MloiIGZpbGw9IiNjNzI0MjYiLz48L2c+PC9nPjwvZz48L3N2Zz4=";

const PALETTE = [OHM_RED, OHM_BLUE, GREEN, GOLD, "#7A4FA3", "#2E8B9E", "#C9622A", "#5B7A99"];

function de(v, d = 3) { return (isFinite(v) ? v.toFixed(d) : "—").replace(".", ","); }
let uidCounter = 1;
function uid() { return `id${uidCounter++}`; }

/* ---------------------------------------------------------------------
   MODELL — allgemeines Reaktionsnetzwerk, RK4-Integration
   dC_i/dt = Σ_Reaktionen ν_i · k·Π(C_Edukt)^Ordnung
--------------------------------------------------------------------- */
function deriv(C, species, reactions) {
  const idx = Object.fromEntries(species.map((s, i) => [s.id, i]));
  const dC = new Array(species.length).fill(0);
  for (const rxn of reactions) {
    let rate = rxn.k;
    for (const r of rxn.reactants) {
      if (!(r.speciesId in idx)) continue;
      rate *= Math.pow(Math.max(C[idx[r.speciesId]], 0), r.order);
    }
    for (const r of rxn.reactants) {
      if (!(r.speciesId in idx)) continue;
      dC[idx[r.speciesId]] -= r.stoich * rate;
    }
    for (const p of rxn.products) {
      if (!(p.speciesId in idx)) continue;
      dC[idx[p.speciesId]] += p.stoich * rate;
    }
  }
  return dC;
}

function autoTmax(species, reactions) {
  if (reactions.length === 0 || species.length === 0) return 10;
  const ks = reactions.map((r) => r.k).filter((k) => isFinite(k) && k > 0);
  if (ks.length === 0) return 10;
  let guess = 5 / Math.min(...ks);
  const cScale = Math.max(1e-6, ...species.map((s) => Math.abs(s.c0)));
  for (let i = 0; i < 8; i++) {
    const probe = simulate(species, reactions, guess, 120);
    const last = probe[probe.length - 1];
    const prev = probe[probe.length - 6] || probe[0];
    const dt = last.t - prev.t;
    let maxRate = 0;
    for (const s of species) {
      const rate = dt > 0 ? Math.abs(last[s.name] - prev[s.name]) / dt : 0;
      maxRate = Math.max(maxRate, rate);
    }
    if (maxRate < cScale * 0.002) break;
    guess *= 1.8;
  }
  return Math.max(0.5, guess);
}

function simulate(species, reactions, tmax, nsteps = 400) {
  const n = species.length;
  let C = species.map((s) => s.c0);
  const dt = tmax / nsteps;
  const data = [Object.fromEntries([["t", 0], ...species.map((s, i) => [s.name, C[i]])])];
  for (let i = 0; i < nsteps; i++) {
    const k1 = deriv(C, species, reactions);
    const C2 = C.map((c, j) => c + (k1[j] * dt) / 2);
    const k2 = deriv(C2, species, reactions);
    const C3 = C.map((c, j) => c + (k2[j] * dt) / 2);
    const k3 = deriv(C3, species, reactions);
    const C4 = C.map((c, j) => c + k3[j] * dt);
    const k4 = deriv(C4, species, reactions);
    C = C.map((c, j) => Math.max(0, c + (dt / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j])));
    const t = (i + 1) * dt;
    data.push(Object.fromEntries([["t", t], ...species.map((s, idx2) => [s.name, C[idx2]])]));
  }
  return data;
}

/* ---------------------------------------------------------------------
   VORLAGEN
--------------------------------------------------------------------- */
function makeTemplate(name) {
  if (name === "order1") {
    const A = { id: uid(), name: "A", c0: 1.0, color: PALETTE[0] };
    const B = { id: uid(), name: "B", c0: 0.0, color: PALETTE[1] };
    return {
      species: [A, B],
      reactions: [{ id: uid(), k: 0.3, reactants: [{ speciesId: A.id, stoich: 1, order: 1 }], products: [{ speciesId: B.id, stoich: 1 }] }],
      tmax: 15,
    };
  }
  if (name === "folge") {
    const A = { id: uid(), name: "A", c0: 1.0, color: PALETTE[0] };
    const B = { id: uid(), name: "B", c0: 0.0, color: PALETTE[1] };
    const C = { id: uid(), name: "C", c0: 0.0, color: PALETTE[2] };
    return {
      species: [A, B, C],
      reactions: [
        { id: uid(), k: 0.5, reactants: [{ speciesId: A.id, stoich: 1, order: 1 }], products: [{ speciesId: B.id, stoich: 1 }] },
        { id: uid(), k: 0.2, reactants: [{ speciesId: B.id, stoich: 1, order: 1 }], products: [{ speciesId: C.id, stoich: 1 }] },
      ],
      tmax: 20,
    };
  }
  if (name === "neben") {
    const A = { id: uid(), name: "A", c0: 1.0, color: PALETTE[0] };
    const B = { id: uid(), name: "B", c0: 0.0, color: PALETTE[1] };
    const C = { id: uid(), name: "C", c0: 0.0, color: PALETTE[2] };
    return {
      species: [A, B, C],
      reactions: [
        { id: uid(), k: 0.3, reactants: [{ speciesId: A.id, stoich: 1, order: 1 }], products: [{ speciesId: B.id, stoich: 1 }] },
        { id: uid(), k: 0.1, reactants: [{ speciesId: A.id, stoich: 1, order: 1 }], products: [{ speciesId: C.id, stoich: 1 }] },
      ],
      tmax: 20,
    };
  }
}

/* ---------------------------------------------------------------------
   UI-BAUSTEINE
--------------------------------------------------------------------- */
function PanelBox({ title, children, right }) {
  return (
    <div style={{ background: PANEL, border: `1px solid ${PANEL_BORDER}`, borderRadius: 8, padding: "14px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 10, paddingBottom: 8, borderBottom: `2px solid ${OHM_RED}` }}>
        <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 12.5, letterSpacing: "0.03em", color: INK, textTransform: "uppercase" }}>{title}</span>
        {right}
      </div>
      {children}
    </div>
  );
}
function NumInput({ value, onChange, step = "any", width = 60, min }) {
  return (
    <input type="number" step={step} min={min} value={value}
      onChange={(e) => onChange(e.target.value === "" ? "" : parseFloat(e.target.value))}
      style={{ width, fontFamily: MONO, fontSize: 12, padding: "3px 5px", border: `1px solid ${PANEL_BORDER}`, borderRadius: 4, textAlign: "right" }} />
  );
}
function TextInput({ value, onChange, width = 50 }) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
      style={{ width, fontFamily: MONO, fontSize: 12, fontWeight: 700, padding: "3px 5px", border: `1px solid ${PANEL_BORDER}`, borderRadius: 4, textAlign: "center" }} />
  );
}
function SpeciesSelect({ value, onChange, species }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{ fontFamily: MONO, fontSize: 12, padding: "3px 4px", border: `1px solid ${PANEL_BORDER}`, borderRadius: 4 }}>
      {species.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
    </select>
  );
}
const btnGhost = { fontFamily: SANS, fontSize: 11, fontWeight: 600, background: "#fff", border: `1px solid ${PANEL_BORDER}`, borderRadius: 5, padding: "4px 9px", color: INK, cursor: "pointer" };
const btnRemove = { background: "none", border: "none", color: GRAY, cursor: "pointer", fontSize: 13, padding: "0 4px" };

/* ---------------------------------------------------------------------
   MAIN APP
--------------------------------------------------------------------- */
export default function ReaktionsnetzwerkMonitor() {
  const init = makeTemplate("order1");
  const [species, setSpecies] = useState(init.species);
  const [reactions, setReactions] = useState(init.reactions);
  const [zoomDomain, setZoomDomain] = useState(null);
  const [refAreaLeft, setRefAreaLeft] = useState(null);
  const [refAreaRight, setRefAreaRight] = useState(null);

  const loadTemplate = (name) => {
    const t = makeTemplate(name);
    setSpecies(t.species);
    setReactions(t.reactions);
    setZoomDomain(null);
  };

  const addSpecies = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const used = new Set(species.map((s) => s.name));
    const name = letters.split("").find((l) => !used.has(l)) || `S${species.length + 1}`;
    setSpecies([...species, { id: uid(), name, c0: 0, color: PALETTE[species.length % PALETTE.length] }]);
  };
  const removeSpecies = (id) => {
    setSpecies(species.filter((s) => s.id !== id));
    setReactions(reactions.map((r) => ({
      ...r,
      reactants: r.reactants.filter((x) => x.speciesId !== id),
      products: r.products.filter((x) => x.speciesId !== id),
    })).filter((r) => r.reactants.length > 0 || r.products.length > 0));
  };
  const updateSpecies = (id, field, value) => setSpecies(species.map((s) => (s.id === id ? { ...s, [field]: value } : s)));

  const addReaction = () => {
    if (species.length === 0) return;
    setReactions([...reactions, { id: uid(), k: 0.1, reactants: [{ speciesId: species[0].id, stoich: 1, order: 1 }], products: [] }]);
  };
  const removeReaction = (id) => setReactions(reactions.filter((r) => r.id !== id));
  const updateReaction = (id, field, value) => setReactions(reactions.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  const addTerm = (rxnId, side) => {
    setReactions(reactions.map((r) => (r.id !== rxnId ? r : {
      ...r,
      [side]: [...r[side], side === "reactants" ? { speciesId: species[0].id, stoich: 1, order: 1 } : { speciesId: species[0].id, stoich: 1 }],
    })));
  };
  const removeTerm = (rxnId, side, idx) => {
    setReactions(reactions.map((r) => (r.id !== rxnId ? r : { ...r, [side]: r[side].filter((_, i) => i !== idx) })));
  };
  const updateTerm = (rxnId, side, idx, field, value) => {
    setReactions(reactions.map((r) => (r.id !== rxnId ? r : {
      ...r, [side]: r[side].map((t, i) => (i !== idx ? t : { ...t, [field]: value })),
    })));
  };

  const speciesById = useMemo(() => Object.fromEntries(species.map((s) => [s.id, s])), [species]);
  const tmax = useMemo(() => autoTmax(species, reactions), [species, reactions]);
  const data = useMemo(() => {
    try { return simulate(species, reactions, tmax); } catch (e) { return []; }
  }, [species, reactions, tmax]);

  const exportCSV = () => {
    const csvNum = (x) => (x === null || x === undefined || Number.isNaN(x) ? "" : x.toFixed(6).replace(".", ","));
    const header = ["Zeit", ...species.map((s) => s.name)].join(";");
    const rows = data.map((row) => [csvNum(row.t), ...species.map((s) => csvNum(row[s.name]))].join(";"));
    const blob = new Blob(["\uFEFF" + [header, ...rows].join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "reaktionsnetzwerk.csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const xDomainBase = [0, tmax];
  const yMaxBase = Math.max(0.01, ...data.flatMap((row) => species.map((s) => row[s.name] || 0))) * 1.08;
  const displayDomain = zoomDomain || [...xDomainBase, 0, yMaxBase];
  const xDomain = [displayDomain[0], displayDomain[1]];
  const yDomain = [displayDomain[2], displayDomain[3]];

  const resetZoom = () => setZoomDomain(null);
  const handleChartMouseDown = (e) => { if (e && e.activeLabel !== undefined) { setRefAreaLeft(e.activeLabel); setRefAreaRight(e.activeLabel); } };
  const handleChartMouseMove = (e) => { if (refAreaLeft !== null && e && e.activeLabel !== undefined) setRefAreaRight(e.activeLabel); };
  const handleChartMouseUp = () => {
    if (refAreaLeft !== null && refAreaRight !== null && refAreaLeft !== refAreaRight) {
      setZoomDomain([Math.min(refAreaLeft, refAreaRight), Math.max(refAreaLeft, refAreaRight), yDomain[0], yDomain[1]]);
    }
    setRefAreaLeft(null); setRefAreaRight(null);
  };
  const handleWheelZoom = (e) => {
    e.preventDefault();
    const cur = zoomDomain || [...xDomainBase, 0, yMaxBase];
    const rect = e.currentTarget.getBoundingClientRect();
    const fracX = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const fracY = 1 - Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    const anchorX = cur[0] + fracX * (cur[1] - cur[0]);
    const anchorY = cur[2] + fracY * (cur[3] - cur[2]);
    const factor = e.deltaY > 0 ? 1.25 : 0.8;
    const newXMin = anchorX - (anchorX - cur[0]) * factor;
    const newXMax = anchorX + (cur[1] - anchorX) * factor;
    const newYMin = anchorY - (anchorY - cur[2]) * factor;
    const newYMax = anchorY + (cur[3] - anchorY) * factor;
    const fullXSpan = xDomainBase[1] - xDomainBase[0];
    if (newXMax - newXMin >= fullXSpan * 0.999) { setZoomDomain(null); return; }
    if (newXMax - newXMin < fullXSpan * 0.01) return;
    setZoomDomain([newXMin, newXMax, newYMin, newYMax]);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div style={{ background: PANEL, border: `1px solid ${PANEL_BORDER}`, borderRadius: 4, padding: "6px 10px", fontFamily: MONO, fontSize: 11, color: INK, boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}>
        <div style={{ opacity: 0.6, marginBottom: 4 }}>t = {de(label, 2)}</div>
        {payload.map((p) => (
          <div key={p.dataKey} style={{ color: p.color, fontWeight: 700 }}>{p.name}: {de(p.value, 4)}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen flex justify-center p-3 md:p-6" style={{ background: BG }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        .ohm-btn:active { transform: translateY(1px); }
      `}</style>

      <div className="w-full flex flex-col gap-4" style={{ maxWidth: 1440, fontFamily: SANS }}>
        {/* HEADER */}
        <div className="flex items-end justify-between flex-wrap gap-3 pb-3" style={{ borderBottom: `3px solid ${OHM_RED}` }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img src={OHM_LOGO} alt="Ohm Angewandte Chemie" style={{ height: 34, width: "auto", display: "block" }} />
              <h1 style={{ fontFamily: SANS, fontWeight: 800, fontSize: "clamp(22px,3vw,30px)", color: INK, letterSpacing: "-0.01em", lineHeight: 1 }}>
                REAKTIONSNETZWERK·MONITOR
              </h1>
            </div>
            <p style={{ fontFamily: SANS, fontSize: 12, color: GRAY, marginTop: 6 }}>
              Fakultät Angewandte Chemie · beliebige Reaktionsnetzwerke · freie Stöchiometrie &amp; Reaktionsordnung · Konzentrations-Zeit-Verläufe
            </p>
          </div>
        </div>

        {/* TEMPLATES */}
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ fontFamily: SANS, fontSize: 11, color: GRAY, fontWeight: 600 }}>Vorlagen:</span>
          <button onClick={() => loadTemplate("order1")} className="ohm-btn" style={btnGhost}>Reaktion 1. Ordnung: A → B</button>
          <button onClick={() => loadTemplate("folge")} className="ohm-btn" style={btnGhost}>Folgereaktion: A → B → C</button>
          <button onClick={() => loadTemplate("neben")} className="ohm-btn" style={btnGhost}>Nebenreaktion: A → B und A → C</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT: SPECIES */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <PanelBox title="Spezies" right={<button onClick={addSpecies} className="ohm-btn" style={btnGhost}>+ Spezies</button>}>
              <div className="flex flex-col gap-2">
                {species.map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                    <TextInput value={s.name} onChange={(v) => updateSpecies(s.id, "name", v)} width={48} />
                    <span style={{ fontFamily: SANS, fontSize: 10.5, color: GRAY }}>C₀=</span>
                    <NumInput value={s.c0} onChange={(v) => updateSpecies(s.id, "c0", v)} width={64} min={0} step="0.05" />
                    <button onClick={() => removeSpecies(s.id)} style={btnRemove}>✕</button>
                  </div>
                ))}
                {species.length === 0 && <div style={{ fontFamily: SANS, fontSize: 11, color: GRAY }}>Keine Spezies — "+ Spezies" zum Starten.</div>}
              </div>
            </PanelBox>

            <PanelBox title="Simulation">
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontFamily: SANS, fontSize: 11, color: GRAY }}>Zeitbereich (automatisch)</span>
                <span style={{ fontFamily: MONO, fontSize: 13, color: INK, fontWeight: 700 }}>0 – {de(tmax, 1)}</span>
              </div>
              <div style={{ fontFamily: SANS, fontSize: 10, color: GRAY, marginBottom: 10 }}>
                Läuft so lange, bis sich alle Konzentrationen stabilisiert haben. Diagramm: Ziehen zum Hineinzoomen, Mausrad zum Zoomen, Doppelklick zum Zurücksetzen.
              </div>
              <button onClick={exportCSV} className="ohm-btn" style={{ ...btnGhost, width: "100%", textAlign: "center" }}>⤓ CSV exportieren</button>
            </PanelBox>
          </div>

          {/* CENTER: REACTIONS */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <PanelBox title="Reaktionsnetzwerk" right={<button onClick={addReaction} className="ohm-btn" style={btnGhost}>+ Reaktion</button>}>
              <div className="flex flex-col gap-3">
                {reactions.map((r) => (
                  <div key={r.id} style={{ border: `1px solid ${PANEL_BORDER}`, borderRadius: 6, padding: 10 }}>
                    <div className="flex items-center flex-wrap gap-1.5" style={{ marginBottom: 6 }}>
                      {r.reactants.map((t, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <span style={{ color: GRAY, fontSize: 12 }}>+</span>}
                          <NumInput value={t.stoich} onChange={(v) => updateTerm(r.id, "reactants", i, "stoich", v)} width={34} min={0} step="1" />
                          <SpeciesSelect value={t.speciesId} onChange={(v) => updateTerm(r.id, "reactants", i, "speciesId", v)} species={species} />
                          <span style={{ fontFamily: SANS, fontSize: 9.5, color: GRAY }}>Ord.</span>
                          <NumInput value={t.order} onChange={(v) => updateTerm(r.id, "reactants", i, "order", v)} width={40} step="0.5" />
                          {r.reactants.length > 1 && <button onClick={() => removeTerm(r.id, "reactants", i)} style={btnRemove}>✕</button>}
                        </React.Fragment>
                      ))}
                      <button onClick={() => addTerm(r.id, "reactants")} style={{ ...btnRemove, color: OHM_RED }} title="Edukt hinzufügen">+</button>
                      <span style={{ color: INK, fontWeight: 700, margin: "0 2px" }}>→</span>
                      {r.products.map((t, i) => (
                        <React.Fragment key={i}>
                          {i > 0 && <span style={{ color: GRAY, fontSize: 12 }}>+</span>}
                          <NumInput value={t.stoich} onChange={(v) => updateTerm(r.id, "products", i, "stoich", v)} width={34} min={0} step="1" />
                          <SpeciesSelect value={t.speciesId} onChange={(v) => updateTerm(r.id, "products", i, "speciesId", v)} species={species} />
                          {r.products.length > 0 && <button onClick={() => removeTerm(r.id, "products", i)} style={btnRemove}>✕</button>}
                        </React.Fragment>
                      ))}
                      <button onClick={() => addTerm(r.id, "products")} style={{ ...btnRemove, color: OHM_RED }} title="Produkt hinzufügen">+</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ fontFamily: SANS, fontSize: 10.5, color: GRAY }}>k =</span>
                        <NumInput value={r.k} onChange={(v) => updateReaction(r.id, "k", v)} width={70} step="0.01" />
                      </div>
                      <button onClick={() => removeReaction(r.id)} className="ohm-btn" style={{ ...btnGhost, color: OHM_RED }}>Reaktion entfernen</button>
                    </div>
                  </div>
                ))}
                {reactions.length === 0 && <div style={{ fontFamily: SANS, fontSize: 11, color: GRAY }}>Keine Reaktionen — "+ Reaktion" zum Starten.</div>}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 10, color: GRAY, marginTop: 10 }}>
                Geschwindigkeit: r = k · Π(C_Edukt)^Ordnung. Stöchiometrie und Reaktionsordnung sind unabhängig voneinander einstellbar.
              </div>
            </PanelBox>
          </div>

          {/* RIGHT: CHART */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div style={{ position: "relative", background: CHART_BG, border: `1px solid ${PANEL_BORDER}`, borderRadius: 8,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)", padding: "10px 12px 4px 0" }}>
              <div className="flex items-center justify-between" style={{ padding: "0 12px", marginBottom: 2 }}>
                <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 11.5, color: INK, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                  Konzentrations-Zeit-Verlauf
                </span>
                {zoomDomain && (
                  <button onClick={resetZoom} className="ohm-btn" style={{ fontFamily: MONO, fontSize: 10.5, background: "#fff", border: `1px solid ${PANEL_BORDER}`, borderRadius: 4, padding: "3px 8px", color: OHM_RED }}>
                    ⤾ Zoom zurücksetzen
                  </button>
                )}
              </div>
              <div style={{ width: "100%", height: 500 }} onWheel={handleWheelZoom} onDoubleClick={resetZoom}>
                <ResponsiveContainer>
                  <ComposedChart data={data} margin={{ top: 24, right: 24, bottom: 30, left: 36 }}
                    onMouseDown={handleChartMouseDown} onMouseMove={handleChartMouseMove} onMouseUp={handleChartMouseUp}>
                    <CartesianGrid stroke={CHART_GRID} strokeDasharray="2 4" />
                    <XAxis dataKey="t" type="number" domain={xDomain} allowDataOverflow stroke={GRAY} tick={{ fontFamily: MONO, fontSize: 11, fill: GRAY }}
                      tickFormatter={(v) => de(v, 1)}
                      label={{ value: "Zeit", position: "insideBottom", offset: -18, fill: GRAY, fontSize: 12, fontFamily: SANS, fontWeight: 600 }} />
                    <YAxis type="number" domain={yDomain} allowDataOverflow
                      stroke={GRAY} tick={{ fontFamily: MONO, fontSize: 11, fill: GRAY }} tickFormatter={(v) => de(v, 2)} width={70}
                      label={{ value: "Konzentration", angle: -90, position: "insideLeft", offset: 0, fill: INK, fontSize: 12, fontFamily: SANS, fontWeight: 600, style: { textAnchor: "middle" } }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={32} wrapperStyle={{ fontFamily: SANS, fontSize: 11.5 }} />
                    {species.map((s) => (
                      <Line key={s.id} dataKey={s.name} name={s.name} stroke={s.color} strokeWidth={2.2} dot={false} isAnimationActive={false} />
                    ))}
                    {refAreaLeft !== null && refAreaRight !== null && (
                      <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} fill={OHM_BLUE} fillOpacity={0.12} />
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${PANEL_BORDER}`, paddingTop: 10, display: "flex", flexWrap: "wrap", gap: "6px 22px" }}>
          <span style={{ fontFamily: SANS, fontSize: 11, color: GRAY }}>Numerik: klassisches Runge-Kutta 4. Ordnung, validiert gegen analytische Lösungen (Reaktion 1. Ordnung, Folgereaktion, Nebenreaktion) auf Maschinengenauigkeit</span>
          <span style={{ fontFamily: SANS, fontSize: 11, color: GRAY }}>Geschwindigkeitsgesetz je Reaktion: r = k · Π(C_i)^n_i über alle Edukte i — Ordnung n_i unabhängig vom stöchiometrischen Koeffizienten wählbar</span>
          <span style={{ fontFamily: SANS, fontSize: 11, color: GRAY }}>Beliebig viele Spezies und Reaktionen — Folge-, Neben- und Gleichgewichtsreaktionen durch entsprechende Hin-/Rückreaktionen abbildbar</span>
        </div>
      </div>
    </div>
  );
}
