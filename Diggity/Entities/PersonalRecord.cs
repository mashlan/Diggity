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
    
    public partial class PersonalRecord : DiggityEntity
    {
        public int Id { get; set; }
        public System.DateTime RecordDate { get; set; }
        public double Value { get; set; }
        public int UnitOfMeasureId { get; set; }
        public int ExerciseId { get; set; }
        public string AspNetUserId { get; set; }
    
        public virtual UnitOfMeasure UnitOfMeasure { get; set; }
        public virtual Exercise Exercise { get; set; }
        public virtual AspNetUser AspNetUser { get; set; }
    }
}