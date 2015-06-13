using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dinner.Models
{
    public class EditMenuModel
    {
        public DateTime Date { get; set; }

        public DishModel[] AvailableDishes { get; set; }
    }
}
