// Copyright (c) FIRST and other WPILib contributors.
// Open Source Software; you can modify and/or share it under the terms of
// the WPILib BSD license file in the root directory of this project.

package frc.robot;

import edu.wpi.first.networktables.NetworkTable;
import edu.wpi.first.networktables.NetworkTableInstance;
import edu.wpi.first.networktables.StringSubscriber;
import edu.wpi.first.wpilibj.TimedRobot;

/**
 * The methods in this class are called automatically corresponding to each mode, as described in
 * the TimedRobot documentation. If you change the name of this class or the package after creating
 * this project, you must also update the Main.java file in the project.
 */
public class Robot extends TimedRobot {
  public final NetworkTable ReactDash = NetworkTableInstance.getDefault().getTable("ReactDash");
  public final NetworkTable MainTable = ReactDash.getSubTable("Main");
  public final StringSubscriber ExampleStringTopic = MainTable.getStringTopic("dpub/example").subscribe("");
  private String ExampleValue = "";

  @Override
  public void robotPeriodic() {
    var value = ExampleStringTopic.get();
    if (ExampleValue.equals(value) == false) {
      System.out.println(value);
      ExampleValue = value;
    }
  }
}
