//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Diggity.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class WorkoutTemplate : DiggityEntity
    {
        public WorkoutTemplate()
        {
            this.TemplateDays = new HashSet<TemplateDays>();
            this.Workouts = new HashSet<Workout>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public System.DateTime StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string UserId { get; set; }
    
        public virtual ICollection<TemplateDays> TemplateDays { get; set; }
        public virtual ICollection<Workout> Workouts { get; set; }
        public virtual AspNetUser AspNetUser { get; set; }
    }
}
